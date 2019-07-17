const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Played_0fae47ae extends Event {
  constructor() {
    super();

    this.signature = 'Played(address,address,bytes32,uint256,bytes)';
    this.hexSignature = '0x0fae47ae36129d8fe9ddc5fbd1a558565eb472b1a08c9e2e23687ddfc83dcef4';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
