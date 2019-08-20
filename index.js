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

  process.environment = env[program.environment];

  const w3Utils = await new W3Utils();
  const redisClient = new RedisClient(w3Utils);
  // Wait for redis connect
  while (!redisClient.ready) await w3Utils.sleep(500);

  new Processor(w3Utils, redisClient).process();
  api(redisClient);
}

main();
