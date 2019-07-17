const Event = require('../Event.js');
const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports = class Lose_ff1ff7e8 extends Event {
  constructor() {
    super();

    this.signature = 'Lose(uint256,uint256,uint256,uint256)';
    this.hexSignature = '0xff1ff7e80e3a256a45b864dc9466ea84e6429b7f9f02cb754273d316fc6d4413';
    this.contract = CoinFlip;
  }

  async process(log) {
    return [log];
  }
};
