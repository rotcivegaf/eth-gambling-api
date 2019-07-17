const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class ApprovalForAll_17307eab extends Event {
  constructor() {
    super();

    this.signature = 'ApprovalForAll(address,address,bool)';
    this.hexSignature = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
