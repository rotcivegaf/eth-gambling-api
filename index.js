const program = require('commander');
const RedisClient = require('./src/RedisClient.js');
const W3Utils = require('./src/W3Utils.js');
const Processor = require('./src/processor/Processor.js');
const api = require('./src/api.js');

const env = require('./environment.js');

async function main() {
  program
    .option(
      '-e, --environment <environment>',
      'The application startup environment',
      'main'
    );

  program.parse(process.argv);

  process.environment = env[program.environment ? program.environment : main];

  const w3Utils = await new W3Utils();
  console.log('Connect Web3 to ' + w3Utils.w3.currentProvider.host);
  const redisClient = new RedisClient(w3Utils);
  // Wait for redis connect
  while (!redisClient.ready) {
    await w3Utils.sleep(500);
    console.log('Wait: ' + 500 + ' ms for redis');
  }
  await redisClient.setAsync('lastProcessBlock', 0);

  new Processor(w3Utils, redisClient).process();
  api(redisClient);
}

main();
