const contracts = require('../ETH/contracts.js');
const env = require('../environment.js');

module.exports = class W3Utils {
  constructor(w3Utils, logProcessor, logger) {
    this.w3Utils = w3Utils;
    this.logger = logger;
    this.logProcessor = logProcessor;
  }

  async process() {
    for (let from = env.startBlock, to = 0; ;) {
      const lastBlock = await this.w3Utils.getBlock('latest');

      if(from >= lastBlock.number) { // dont have events
        this.logger.wait(env.wait);
        await this.w3Utils.sleep(env.wait);
      } else { // have events
        to = Math.abs(from - lastBlock.number) < env.interval ? lastBlock.number : from + env.interval;

        const logs = await this.w3Utils.getPastLogs({
          fromBlock: from.toString(),
          toBlock: to.toString(),
          address: contracts.addresses
        });

        for (const log of logs) {
          await this.logProcessor.process(log);

          //await this.w3Utils.sleep(5000);


          //await redis.hmset(
          //  contractName + ':' + logs[i].address + ':' + commit.key,
          //  commit.dataObject
          //);
          //logger.commit(commit);
        }

        //await redis.set('lastProcessBlock', to.toString());
        this.logger.processedBlocks(from, to);
        from = to;

      }
    }
  }
};
