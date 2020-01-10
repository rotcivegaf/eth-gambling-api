const Event = require('../Event.js');
const { addCurrency } = require('./Utils.js');

module.exports = class Deposit_7cfff908 extends Event {
  constructor() {
    super();

    this.signature = 'Deposit(address,address,address,uint256)';
    this.hexSignature = '0x7cfff908a4b583f36430b25d75964c458d8ede8a99bd61be750e97ee1b2f3a96';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_to',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': '_token',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_value',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = this.decodeLog(log);

    const keyAdd = ['user', event._to, 'token', event._token, 'balance'].join(':');
    await process.redis.add(keyAdd, event._value.toString());

    await addCurrency(event._token);
  }
};
