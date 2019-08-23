const W3 = require('web3');
const { promisify } = require('util');

module.exports = class W3Utils {
  constructor() {
    this.sleep = promisify(setTimeout);
    this.address0x = '0x0000000000000000000000000000000000000000';

    this.w3 = new W3(new W3.providers.HttpProvider(process.environment.node));
    this.isBN = this.w3.utils.isBN;
    this.getPastLogs = this.w3.eth.getPastLogs;
    this.getTransactionReceipt = this.w3.eth.getPastLogs;
    this.numberToHex = this.w3.utils.numberToHex;
  }

  async getBlock(x) {
    return this.w3.eth.getBlock(x).catch(e => console.log(e));
  }

  bn(x) {
    return this.w3.utils.toBN(x);
  }
};
