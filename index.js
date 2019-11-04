const program = require('commander');
const RedisClient = require('./src/RedisClient.js');
const W3Utils = require('./src/W3Utils.js');
const Processor = require('./src/processor/Processor.js');
const LogProcessor = require('./src/processor/LogProcessor.js');

const ERC20Json = require('./src/ETH/build/contracts/ERC20.json');
const GamblingManagerJson = require('./src/ETH/build/contracts/GamblingManager.json');
const CoinFlipJson = require('./src/ETH/build/contracts/CoinFlip.json');

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

  process.w3Utils = new W3Utils();

  process.contracts = {
    erc20: new process.w3Utils.w3.eth.Contract(ERC20Json.abi),
    gamblingManager: new process.w3Utils.w3.eth.Contract(GamblingManagerJson.abi),
    coinFlip: new process.w3Utils.w3.eth.Contract(CoinFlipJson.abi),
  };

  process.redis = new RedisClient();
  await process.redis.init();
  process.processor = new Processor();
  process.logProcessor = new LogProcessor();

  process.processor.process();
  api();
}

main();
