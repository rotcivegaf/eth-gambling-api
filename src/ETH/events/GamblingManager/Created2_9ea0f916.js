const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created2_9ea0f916 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created2(address,bytes32,address,address,uint256,bytes,uint256)';
    this.hexSignature = '0x9ea0f916e885ca97da76b3c446e366a6ddf7b33737a0f7a661c331950efef359';
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
        'name': '_takenAmount',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': '_data',
        'type': 'bytes'
      },
      {
        'indexed': false,
        'name': '_salt',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const betObj = {
      createTipe: 2,
      nonce_salt: event._salt.toString()
    };

    await addBet(event, betObj);
  }
};
