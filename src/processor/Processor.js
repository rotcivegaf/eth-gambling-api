const Logger = require('./Logger.js');
const LogProcessor = require('./LogProcessor.js');

module.exports = class W3Utils {
  constructor(w3Utils, redisClient) {
    this.w3Utils = w3Utils;
    this.redisClient = redisClient;
    this.logger = new Logger();

    this.logProcessor = new LogProcessor(w3Utils, redisClient, this.logger);
  }

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
      lastBlock = await this.w3Utils.getBlock('latest');

      if(from >= lastBlock.number) { // dont have events
        this.logger.wait(wait);
        await this.w3Utils.sleep(wait);
      } else { // have events
        to = Math.abs(from - lastBlock.number) < interval ? lastBlock.number : from + interval;

        const logs = await this.w3Utils.getPastLogs({
          fromBlock: from.toString(),
          toBlock: to.toString(),
          address: addresses
        });

        for (const log of logs) {
          await this.logProcessor.process(log);
        }
        await this.redisClient.setAsync('lastProcessBlock', to.toString());
        this.logger.processedBlocks(from, to);
        from = to;
      }
    }
  }
};
