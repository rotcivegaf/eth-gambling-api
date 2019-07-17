const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class ModelTransfer_0beecb55 extends Event {
  constructor() {
    super();

    this.signature = 'ModelTransfer(bytes32,address,uint256)';
    this.hexSignature = '0x0beecb5526acb0cbfa50f481ee6ddbcef5430db81beb1e4254a2113a25182e7f';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
