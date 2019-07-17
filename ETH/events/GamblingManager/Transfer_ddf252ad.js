const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Transfer_ddf252ad extends Event {
  constructor() {
    super();

    this.signature = 'Transfer(address,address,uint256)';
    this.hexSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
