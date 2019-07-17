const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Tip_cbefbf6a extends Event {
  constructor() {
    super();

    this.signature = 'Tip(address,address,uint256)';
    this.hexSignature = '0xcbefbf6a902aa93a9aafdd30aefd16e61f6c015bbf5fcaccfdf1d29d0c84e7d0';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
