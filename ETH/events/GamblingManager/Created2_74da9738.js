const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Created2_74da9738 extends Event {
  constructor() {
    super();

    this.signature = 'Created2(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0x74da973888be896e232abd439b13097a4319d859b05de4bf9ecd2c9ab712cf56';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
