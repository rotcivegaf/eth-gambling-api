const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created3_69ab09e3 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created3(address,bytes32,address,address,uint256,bytes,uint256)';
    this.hexSignature = '0x69ab09e31a9b2012402c87c116c9f8135bc26c96308f53c4c7a678a1f01b86e7';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_creator',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': '_id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': '_token',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'contract IModel',
        'name': '_model',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_takenAmount',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_salt',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const betObj = {
      createTipe: 3,
      nonce_salt: event._salt.toString()
    };

    await addBet(event, betObj);
  }
};
