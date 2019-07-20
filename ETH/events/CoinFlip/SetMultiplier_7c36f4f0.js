const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class SetMultiplier_7c36f4f0 extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = CoinFlip;

    this.signature = 'SetMultiplier(uint256,uint256)';
    this.hexSignature = '0x7c36f4f09129892bcf3dc5b110d9b3644884bbdd87fa190dcc3b1e9877dc4384';
    this.inputs = [
      {
        'indexed':false,
        'name':'_possibility',
        'type':'uint256'
      },
      {
        'indexed':false,
        'name':'_multiplier',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    return [log];
  }
};
