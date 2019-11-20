const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created_6470b4d3 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created(address,bytes32,address,address,bytes,uint256)';
    this.hexSignature = '0x6470b4d36a9fe4a57e20170993de7a63ac50ab6fd4900e5ee512b5e807e894c3';
    this.inputs = [
      {
        'indexed': true,
        'name': '_creator',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': '_token',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_model',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_data',
        'type': 'bytes'
      },
      {
        'indexed': false,
        'name': '_nonce',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const betObj = {
      createTipe: 1,
      nonce_salt: event._nonce.toString()
    };

    await addBet(event, betObj);
  }
};
