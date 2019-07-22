const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class OwnershipTransferred_8be0079c extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = GamblingManager;

    this.signature = 'OwnershipTransferred(address,address)';
    this.hexSignature = '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0';
    this.inputs = [
      {
        'indexed':true,
        'name':'_previousOwner',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_newOwner',
        'type':'address'
      }
    ];
  }

  async process(log) {
  }
};
