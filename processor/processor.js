const w3Utils = require('./w3Utils.js');
const contracts = require('../ETH/contracts.js');
const RedisClient = require('./RedisClient.js');
const LogProcessor = require('./LogProcessor.js');
const Logger = require('./Logger.js');

const env = require('../environment.js');

module.exports = async () => {
  const redis = new RedisClient();
  const logProcessor = new LogProcessor();
  const logger = new Logger();

  for (let from = env.startBlock, to = 0; ;) {
    const lastBlock = await w3Utils.getBlock('latest');

    if(from >= lastBlock.number) { // dont have events
      await w3Utils.sleep(env.wait);
      logger.wait(env.wait);
    } else { // haves events
      to = Math.abs(from - lastBlock.number) < env.interval ? lastBlock.number : from + env.interval;

      const logs = await w3Utils.getPastLogs(contracts.addresses, from, to);

      for (let i = 0; i < logs.length; i++) {
        const commit = await logProcessor.process(logs[i]);
        const contractName = contracts.getName(logs[i].address);
        logger.log(contractName, logs[i]);

        await redis.hmset(
          contractName + ':' + logs[i].address + ':' + commit.key,
          commit.dataObject
        );
        logger.commit(commit);
      }

      await redis.set("lastProcessBlock", to.toString());
      logger.processedBlocks(from, to);
      from = to;
    }
  }
};
