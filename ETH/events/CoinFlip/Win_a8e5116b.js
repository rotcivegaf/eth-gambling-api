const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class Win_a8e5116b extends Event {
  constructor() {
    super();

    this.signature = 'Win(uint256,uint256,uint256,uint256)';
    this.hexSignature = '0xa8e5116b10f6bc252038b8927939c96eedbd5b9b3103c44c83bffd92996c41f9';
    this.contract = CoinFlip;
  }

  async process(log) {
    return [log];
  }
};
