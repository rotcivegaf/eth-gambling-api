const Logger = require('./Logger.js');
const LogProcessor = require('./LogProcessor.js');

const contracts = require('../ETH/contracts.js');

module.exports = class W3Utils {
  constructor(w3Utils, redisClient) {
    this.w3Utils = w3Utils;
    this.redisClient = redisClient;
    this.logger = new Logger();
    this.logProcessor = new LogProcessor(w3Utils, redisClient, this.logger);
  }

  async process() {
    for (let from = process.environment.startBlock, to = 0; ;) {
      const lastBlock = await this.w3Utils.getBlock('latest');

      if(from >= lastBlock.number) { // dont have events
        this.logger.wait(process.environment.wait);
        await this.w3Utils.sleep(process.environment.wait);
      } else { // have events
        to = Math.abs(from - lastBlock.number) < process.environment.interval ? lastBlock.number : from + process.environment.interval;

        const logs = await this.w3Utils.getPastLogs({
          fromBlock: from.toString(),
          toBlock: to.toString(),
          address: contracts.addresses
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
