const util = require('util');
const W3 = require('web3');

const env = require('../environment.js');

module.exports.w3 = new W3(new W3.providers.HttpProvider(env.node));
const w3 = this.w3;

module.exports.getBlock = async (blockHashOrBlockNumber) => {
  return await w3.eth.getBlock(blockHashOrBlockNumber);
};

module.exports.sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports.getPastLogs = async (address, from, to) => {
  const allLogs = util.promisify(w3.eth.getPastLogs);

  return await allLogs({
    fromBlock: from.toString(),
    toBlock: to.toString(),
    address: address
  });
};

module.exports.getTransactionReceipt = async (hash) => {
  return await w3.eth.getTransactionReceipt(hash);
};
