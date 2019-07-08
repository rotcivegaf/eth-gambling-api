const util = require('util');
const W3 = require('web3');

const environment = require('./environment.js');

module.exports.w3 = new W3(new W3.providers.HttpProvider(environment.node));
const w3 = this.w3;

module.exports.getBlock = async (blockHashOrBlockNumber) => {
  return await w3.eth.getBlock(blockHashOrBlockNumber);
};

module.exports.sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//module.exports.getPastLogs = async (addresses, from, to) => {
//  const allLogs = util.promisify(w3.eth.getPastLogs);
//
//  return await allLogs({
//    fromBlock: from,
//    toBlock: to,
//    address: addresses
//  });
//};

module.exports.getPastLogs = async (address, s,ss) => {
  const allLogs = util.promisify(w3.eth.getPastLogs);

  return await allLogs({
    fromBlock: s.toString(),
    toBlock: ss.toString(),
    address: address
  });
};
//
//module.exports.allEvents = async (ABI, address) => {
//  const gamblingManager = new w3.eth.Contract(ABI, address);
//  const allEventsAsync = util.promisify(gamblingManager.events.allEvents);
//
//  await allEventsAsync({ fromBlock: 0 }, function (error, result) {
//    if (error)
//      console.log(error);
//    console.log(result);
//  });
//};
