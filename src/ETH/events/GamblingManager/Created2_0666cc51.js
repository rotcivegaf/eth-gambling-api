const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created2_0666cc51 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created2(address,bytes32,address,address,bytes,uint256)';
    this.hexSignature = '0x0666cc51af82c4e09e198d3915d5e30e733e5d67550ab603a682904a16199145';
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
      createTipe: 2,
      nonce_salt: event._salt.toString()
    };

    await addBet(event, betObj);
  }
};
