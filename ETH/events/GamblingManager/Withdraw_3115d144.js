const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Withdraw_3115d144 extends Event {
  constructor() {
    super();

    this.signature = 'Withdraw(address,address,address,uint256)';
    this.hexSignature = '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
