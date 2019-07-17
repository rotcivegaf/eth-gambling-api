const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Approval_8c5be1e5 extends Event {
  constructor() {
    super();

    this.signature = 'Approval(address,address,uint256)';
    this.hexSignature = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
