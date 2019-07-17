const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Approval_a0175360 extends Event {
  constructor() {
    super();

    this.signature = 'Approval(address,address,address,uint256)';
    this.hexSignature = '0xa0175360a15bca328baf7ea85c7b784d58b222a50d0ce760b10dba336d226a61';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
