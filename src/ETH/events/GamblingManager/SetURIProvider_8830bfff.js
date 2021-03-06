const Event = require('../Event.js');

module.exports = class SetURIProvider_8830bfff extends Event {
  constructor() {
    super();

    this.signature = 'SetURIProvider(address)';
    this.hexSignature = '0x8830bfff0a198778822a37d97bfba3d9d6e08bcd080eb82f2a76f2060a7494ec';
    this.inputs = [
      {
        'indexed': false,
        'internalType': 'contract URIProvider',
        'name': '_uriProvider',
        'type': 'address'
      }
    ];
  }

  async process(log) {
    const event = this.decodeLog(log);

    const key = [this.contractName, 'URIProvider'].join(':');
    await process.redis.setAsync(key, event._uriProvider);
  }
};
