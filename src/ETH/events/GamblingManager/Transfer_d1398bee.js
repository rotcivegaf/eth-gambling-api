const Event = require('../Event.js');

module.exports = class Transfer_d1398bee extends Event {
  constructor() {
    super();

    this.signature = 'Transfer(address,address,address,uint256)';
    this.hexSignature = '0xd1398bee19313d6bf672ccb116e51f4a1a947e91c757907f51fbb5b5e56c698f';
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
    const amount = event._value.toString();

    if (amount === '0')
      return;

    const keySub = ['user', event._from, 'token', event._token, 'balance'].join(':');
    await process.redis.sub(keySub, amount);

    const keyAdd = ['user', event._to, 'token', event._token, 'balance'].join(':');
    await process.redis.add(keyAdd, amount);
  }
};
