const W3 = require('web3');
const { promisify } = require('util');

module.exports = class W3Utils {
  constructor() {
    this.sleep = promisify(setTimeout);
    this.address0x = '0x0000000000000000000000000000000000000000';
    this.bytes320x = '0x0000000000000000000000000000000000000000000000000000000000000000';

    this.w3 = new W3(new W3.providers.HttpProvider(process.environment.nodeEth));
    console.log('Connect Web3 to ' + this.w3.currentProvider.host);

    this.getPastLogs = this.w3.eth.getPastLogs;
    this.getTransactionReceipt = this.w3.eth.getPastLogs;

    this.isBN = W3.utils.isBN;
    this.numberToHex = W3.utils.numberToHex;
    this.bn = W3.utils.toBN;
  }

  addToString (x, y) {
    x = this.bn(x);
    y = this.bn(y);

    return x.add(y).toString();
  }

  subToString (x, y) {
    x = this.bn(x);
    y = this.bn(y);

    return x.sub(y).toString();
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

  getContractName(address) {
    return process.environment.contracts.find(c => c.address === address).name;
  }
};
