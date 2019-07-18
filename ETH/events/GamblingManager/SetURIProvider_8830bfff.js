const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class SetURIProvider_8830bfff extends Event {
  constructor() {
    super();

    this.contract = GamblingManager;

    this.signature = 'SetURIProvider(address)';
    this.hexSignature = '0x8830bfff0a198778822a37d97bfba3d9d6e08bcd080eb82f2a76f2060a7494ec';
    this.inputs = [
      {
        'indexed':false,
        'name':'_uriProvider',
        'type':'address'
      }
    ];
  }

  async process(log) {
    return [log];
  }
};
