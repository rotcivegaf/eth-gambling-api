const logger = require('./logger.js');

module.exports = class Processor {
  async process() {
    const interval = process.environment.interval;
    const wait = process.environment.wait;
    const startBlock = process.environment.startBlock;
    const contractsAddresses = process.environment.contracts.map(c => c.address);
    const addresses = [];
    for(const key in contractsAddresses) {
      addresses.push(contractsAddresses[key]);
    }
    let lastBlock;

    for (let from = startBlock, to = 0; ;) {
      lastBlock = await process.w3Utils.getBlock();

      if(from >= lastBlock.number) { // dont have events
        logger.wait(wait);
        await process.w3Utils.sleep(wait);
      } else { // have events
        to = Math.abs(from - lastBlock.number) < interval ? lastBlock.number : from + interval;

        const logs = await process.w3Utils.getPastLogs({
          fromBlock: from.toString(),
          toBlock: to.toString(),
          address: addresses
        });

        for (const log of logs)
          await this.processLog(log);

        await process.redis.setAsync('lastProcessBlock', to.toString());
        logger.processedBlocks(from, to);
        from = to;
      }
    }
  }

  async processLog(log) {
    log.address = process.w3Utils.w3.utils.toChecksumAddress(log.address);

    const contract = process.eventsContracts[log.address];
    const contractName = process.w3Utils.getContractName(log.address);

    const eventSignature = contract.getEvent(log);

    console.log(['BlockNumber: ' + log.blockNumber, 'LogIndex: ' + log.logIndex, contractName, eventSignature].join('\t'));

    return contract.process(log);
  }
};
