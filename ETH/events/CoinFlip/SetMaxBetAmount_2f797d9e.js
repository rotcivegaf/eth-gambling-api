const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class SetMaxBetAmount_2f797d9e extends Event {
  constructor() {
    super();

    this.signature = 'SetMaxBetAmount(bytes32,uint256)';
    this.hexSignature = '0x2f797d9e895271236f9486994ffcefb1e27e7a031d9ec1beda769d4c8ac269ea';
    this.contract = CoinFlip;
  }

  async process(log) {
    return [log];
  }
};
