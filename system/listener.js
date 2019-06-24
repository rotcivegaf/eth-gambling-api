const util = require('util');
const Web3 = require('web3');

const contracts = require('./contracts.js');
const environment = require('./environment.js');



const gamblingManagerAddress = '0x9B21827871079537482Eefe04bff55859D8059bC';
const coinFlipAddress = '0x3Df4FE2B467C5bbA5688F4b494FEb2A5A6B65BCb';

// const w3 = new Web3(new Web3.providers.WebsocketProvider(environment.infura.mainnet));
// const w3 = new Web3(new Web3.providers.WebsocketProvider(environment.rcn.mainnet));

// const w3 = new Web3(new Web3.providers.WebsocketProvider(environment.infura.ropsten));
// const w3 = new Web3(new Web3.providers.WebsocketProvider(environment.rcn.ropsten));

const w3 = new Web3(new Web3.providers.WebsocketProvider(environment.local))

module.exports.test = async () => {
  // await this.subscribeLogEvent(gamblingManagerAddress);
  // await this.subscribeLogEvent(coinFlipAddress);

  // console.log(await this.allEvents(contracts[0].ABI, contracts[0].address));
  //console.log((await this.allEvents(contracts[0].ABI, gamblingManagerAddress)));
  await this.allEvents(contracts[0].ABI, coinFlipAddress);

  // await this.allEvents(contracts[1].ABI, coinFlipAddress);
  // await this.getEvents(contracts[0].ABI, contracts[0].address);
};

module.exports.getBlockTime = async () => {
  const block = await w3.eth.getBlock(await w3.eth.getBlockNumber());
  return block.timestamp;
};

module.exports.subscribeLogEvent = async (address) => {
  const allLogs = util.promisify(w3.eth.subscribe);

  return await allLogs('logs', { address: address });
};

module.exports.allEvents = async (ABI, address) => {
  const gamblingManager = new w3.eth.Contract(ABI, address);
  const allEventsAsync = util.promisify(gamblingManager.events.allEvents);

let a;
  const subscription = allEventsAsync({ fromBlock: 0 }, function (error, result) {
    if (error)
      console.log(error);
    a = result;
  }).then((res,) => {
    res.unsubscribe((error, success) => {
      if (success) {
        console.log(success);
        console.log('Successfully unsubscribed!');
      }
    });
  });


console.log(subscription);

  return a;
};

this.test();
