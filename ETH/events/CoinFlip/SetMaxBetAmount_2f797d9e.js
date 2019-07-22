const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class SetMaxBetAmount_2f797d9e extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = CoinFlip;

    this.signature = 'SetMaxBetAmount(bytes32,uint256)';
    this.hexSignature = '0x2f797d9e895271236f9486994ffcefb1e27e7a031d9ec1beda769d4c8ac269ea';
    this.inputs = [
      {
        'indexed':false,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':false,
        'name':'_maxBetAmount',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
  }
};
