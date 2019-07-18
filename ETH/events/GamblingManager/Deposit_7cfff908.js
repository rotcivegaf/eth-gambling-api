const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Deposit_7cfff908 extends Event {
  constructor() {
    super();

    this.contract = GamblingManager;

    this.signature = 'Deposit(address,address,address,uint256)';
    this.hexSignature = '0x7cfff908a4b583f36430b25d75964c458d8ede8a99bd61be750e97ee1b2f3a96';
    this.inputs = [
      {
        'indexed':true,
        'name':'_from',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_to',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_token',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_value',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    return [log];
  }
};
