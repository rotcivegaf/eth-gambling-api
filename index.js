const RedisClient = require('./src/RedisClient.js');
const W3Utils = require('./src/W3Utils.js');
const Processor = require('./src/processor/Processor.js');
const api = require('./src/api.js');

async function main() {
  const w3Utils = await new W3Utils();
  const redisClient = await new RedisClient(w3Utils);

  new Processor(w3Utils, redisClient).process();
  api(redisClient);
}

main();
