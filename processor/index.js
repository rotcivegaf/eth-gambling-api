const RedisClient = require('./RedisClient.js');
const W3Utils = require('./W3Utils.js');
const Logger = require('./Logger.js');
const LogProcessor = require('./LogProcessor.js');
const Processor = require('./Processor.js');

module.exports = async () => {
  const w3Utils = await new W3Utils();
  const redisClient = await new RedisClient(w3Utils);
  const logger = await new Logger();
  const logProcessor = await new LogProcessor(w3Utils, redisClient, logger);
  const processor = await new Processor(w3Utils, logProcessor, logger);

  await processor.process();
};
