const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Created3_8ea26732 extends Event {
  constructor() {
    super();

    this.signature = 'Created3(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0x8ea2673206c8d0d25f9edd4478e0560ec03cb5ff6c31fcaf40d6ff572c159d5e';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
