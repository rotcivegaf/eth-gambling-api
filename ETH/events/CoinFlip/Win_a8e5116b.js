const coinFlip = require('./CoinFlip.js');

module.exports = class Win_a8e5116b extends coinFlip {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Win(uint256,uint256,uint256,uint256)';
    this.hexSignature = '0xa8e5116b10f6bc252038b8927939c96eedbd5b9b3103c44c83bffd92996c41f9';
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
      },
      {
        'indexed':false,
        'name':'_luckyNumber',
        'type':'uint256'
      },
      {
        'indexed':false,
        'name':'_betNumber',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
  }
};
