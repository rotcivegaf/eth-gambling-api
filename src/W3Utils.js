const W3 = require('web3');
const { promisify } = require('util');

module.exports = class W3Utils {
  constructor() {
    this.sleep = promisify(setTimeout);
    this.address0x = '0x0000000000000000000000000000000000000000';

    this.w3 = new W3(new W3.providers.HttpProvider(process.environment.nodeEth));
    this.isBN = this.w3.utils.isBN;
    this.getPastLogs = this.w3.eth.getPastLogs;
    this.getTransactionReceipt = this.w3.eth.getPastLogs;
    this.numberToHex = this.w3.utils.numberToHex;
  }

  async getBlock(x = 'latest') {
    let block = await this.w3.eth.getBlock(x).catch(e => console.log(e));

    if(block === undefined) {
      console.log('Wait 500 ms for getBlock Error');
      await this.sleep(500);
      block = await this.getBlock();
    }

    return block;
  }

  bn(x) {
    return this.w3.utils.toBN(x);
  }
};
