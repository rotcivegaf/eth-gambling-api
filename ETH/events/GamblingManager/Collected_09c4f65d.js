const gamblingManager = require('./GamblingManager.js');

module.exports = class Collected_09c4f65d extends gamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Collected(address,bytes32,address,uint256,bytes)';
    this.hexSignature = '0x09c4f65d7f2abc599371a31f6965ff6c7ac7f452d3623419351a1ea55a41cd76';
    this.inputs = [
      {
        'indexed':true,
        'name':'_collecter',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':true,
        'name':'_beneficiary',
        'type':'address'
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
