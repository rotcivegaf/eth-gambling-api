const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Transfer_ddf252ad extends Event {
  constructor() {
    super();

    this.contract = GamblingManager;

    this.signature = 'Transfer(address,address,uint256)';
    this.hexSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    this.inputs = [
      {
        'indexed':true,
        'name':'_from',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_to',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_tokenId',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    return [log];
  }
};
