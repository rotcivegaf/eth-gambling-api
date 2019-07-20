const W3 = require('web3');
const { promisify } = require('util');

const env = require('../environment.js');

module.exports = class W3Utils {
  constructor() {
    this.sleep = promisify(setTimeout);
    this.address0x = '0x0000000000000000000000000000000000000000';

    this.w3 = new W3(new W3.providers.HttpProvider(env.node));
    this.getPastLogs = this.w3.eth.getPastLogs;
    this.getTransactionReceipt = this.w3.eth.getPastLogs;
    this.getBlock = this.w3.eth.getBlock;
  }
};
