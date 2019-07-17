const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Transfer_d1398bee extends Event {
  constructor() {
    super();

    this.signature = 'Transfer(address,address,address,uint256)';
    this.hexSignature = '0xd1398bee19313d6bf672ccb116e51f4a1a947e91c757907f51fbb5b5e56c698f';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
