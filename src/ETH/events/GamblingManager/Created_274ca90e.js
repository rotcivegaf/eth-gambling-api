const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created_274ca90e extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created(address,bytes32,address,address,uint256,bytes,uint256)';
    this.hexSignature = '0x274ca90e57854ea4d26a9f62581f4c16fdc4774018ac0f50d8411f836666113b';
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
