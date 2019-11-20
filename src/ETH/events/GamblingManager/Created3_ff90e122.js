const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created3_ff90e122 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created3(address,bytes32,address,address,bytes,uint256)';
    this.hexSignature = '0xff90e1227bd9a91b7f3d3aea848b3035e296e83d688f72d8226e1ac4112a29db';
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
