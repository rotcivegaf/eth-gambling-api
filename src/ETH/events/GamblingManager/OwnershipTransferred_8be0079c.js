const Event = require('../Event.js');

module.exports = class OwnershipTransferred_8be0079c extends Event {
  constructor() {
    super();

    this.signature = 'OwnershipTransferred(address,address)';
    this.hexSignature = '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_newOwner',
        'type': 'address'
      }
    ];
  }

  async process(log) {
    const event = this.decodeLog(log);

    const key = [this.contractName, 'owner'].join(':');
    await process.redis.setAsync(key, event._newOwner);
  }
};
