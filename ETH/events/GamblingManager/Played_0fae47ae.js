const gamblingManager = require('./GamblingManager.js');

module.exports = class Played_0fae47ae extends gamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Played(address,address,bytes32,uint256,bytes)';
    this.hexSignature = '0x0fae47ae36129d8fe9ddc5fbd1a558565eb472b1a08c9e2e23687ddfc83dcef4';
    this.inputs = [
      {
        'indexed':true,
        'name':'_sender',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_player',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':false,
        'name':'_amount',
        'type':'uint256'
      },
      {
        'indexed':false,
        'name':'_data',
        'type':'bytes'
      }
    ];
  }

  async process(log) {
  }
};
