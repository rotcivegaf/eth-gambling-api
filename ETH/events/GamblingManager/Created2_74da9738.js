const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Created2_74da9738 extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = GamblingManager;

    this.signature = 'Created2(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0x74da973888be896e232abd439b13097a4319d859b05de4bf9ecd2c9ab712cf56';
    this.inputs = [
      {
        'indexed':true,
        'name':'_creator',
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
        'name':'_salt',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
  }
};
