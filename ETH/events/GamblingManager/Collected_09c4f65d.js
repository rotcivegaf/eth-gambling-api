const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Collected_09c4f65d extends Event {
  constructor() {
    super();

    this.signature = 'Collected(address,bytes32,address,uint256,bytes)';
    this.hexSignature = '0x09c4f65d7f2abc599371a31f6965ff6c7ac7f452d3623419351a1ea55a41cd76';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
