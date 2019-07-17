const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Deposit_7cfff908 extends Event {
  constructor() {
    super();

    this.signature = 'Deposit(address,address,address,uint256)';
    this.hexSignature = '0x7cfff908a4b583f36430b25d75964c458d8ede8a99bd61be750e97ee1b2f3a96';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
