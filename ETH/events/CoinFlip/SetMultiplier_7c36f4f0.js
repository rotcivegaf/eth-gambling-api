const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class SetMultiplier_7c36f4f0 extends Event {
  constructor() {
    super();

    this.signature = 'SetMultiplier(uint256,uint256)';
    this.hexSignature = '0x7c36f4f09129892bcf3dc5b110d9b3644884bbdd87fa190dcc3b1e9877dc4384';
    this.contract = CoinFlip;
  }

  async process(log) {
    return [log];
  }
};
