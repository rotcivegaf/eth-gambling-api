const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created_c4317439 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Created(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0xc4317439075cf670016d9fff15c98babe21304c2c393e72a80d34d993779e70a';
    this.inputs = [
      {
        'indexed':true,
        'name':'_sender',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':false,
        'name':'_token',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_data',
        'type':'bytes'
      },
      {
        'indexed':false,
        'name':'_nonce',
        'type':'uint256'
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
