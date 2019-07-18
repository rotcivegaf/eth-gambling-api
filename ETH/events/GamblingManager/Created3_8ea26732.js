const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Created3_8ea26732 extends Event {
  constructor() {
    super();

    this.contract = GamblingManager;

    this.signature = 'Created3(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0x8ea2673206c8d0d25f9edd4478e0560ec03cb5ff6c31fcaf40d6ff572c159d5e';
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
    return [log];
  }
};
