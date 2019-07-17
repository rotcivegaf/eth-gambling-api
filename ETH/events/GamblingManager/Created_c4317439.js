const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Created_c4317439 extends Event {
  constructor() {
    super();

    this.signature = 'Created(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0xc4317439075cf670016d9fff15c98babe21304c2c393e72a80d34d993779e70a';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
