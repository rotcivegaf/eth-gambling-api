const gamblingManager = require('./GamblingManager.js');

module.exports = class OwnershipTransferred_8be0079c extends gamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

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
    const event = await this.decodeLog(log);

    const key = [this.contract.name, 'owner'].join(':');
    await this.redis.setAsync(key, event._newOwner);
  }
};
