const CoinFlip = require('./CoinFlip.js');

module.exports = class Lose_ff1ff7e8 extends CoinFlip {
  constructor() {
    super();

    this.signature = 'Lose(uint256,uint256,uint256,uint256)';
    this.hexSignature = '0xff1ff7e80e3a256a45b864dc9466ea84e6429b7f9f02cb754273d316fc6d4413';
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
