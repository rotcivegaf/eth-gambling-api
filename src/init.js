const env = require('../environment.js');
const program = require('commander');

const RedisClient = require('./RedisClient.js');
const W3Utils = require('./W3Utils.js');
const Processor = require('./processor/Processor.js');

const ERC20Json = require('./ETH/build/contracts/ERC20.json');
const GamblingManagerJson = require('./ETH/build/contracts/GamblingManager.json');
const CoinFlipJson = require('./ETH/build/contracts/CoinFlip.json');
const P2PJson = require('./ETH/build/contracts/P2P.json');

module.exports = async () => {
  process.environment = initEnv();
  process.w3Utils = new W3Utils();
  process.contracts = initContracts();
  process.eventsContracts = initEventsContracts();
  process.redis = await (new RedisClient()).init();
  process.processor = new Processor();
};

function initEnv() {
  program
    .option(
      '-e, --environment <environment>',
      'The application startup environment',
      'main'
    );

  program.parse(process.argv);

  return env[program.environment ? program.environment : 'main'];
}

function initContracts() {
  return {
    erc20: new process.w3Utils.w3.eth.Contract(ERC20Json.abi),
    gamblingManager: new process.w3Utils.w3.eth.Contract(GamblingManagerJson.abi),
    coinFlip: new process.w3Utils.w3.eth.Contract(CoinFlipJson.abi),
    p2p: new process.w3Utils.w3.eth.Contract(P2PJson.abi),
  };
}

function initEventsContracts () {
  const eventsContracts = {};

  for (const contract of process.environment.contracts) {
    let EventsContract;
    try {
      EventsContract = require('./ETH/contractEvent/' + contract.name + '.js');
    } catch (error) {
      EventsContract = require('./ETH/contractEvent/ContractEvent.js');
    }

    eventsContracts[contract.address] = new EventsContract(contract.address, contract.name, contract.abi);
    eventsContracts[contract.name] = eventsContracts[contract.address];
  }

  return eventsContracts;
}
