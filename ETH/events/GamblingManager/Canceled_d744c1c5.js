const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Canceled_d744c1c5 extends Event {
  constructor() {
    super();

    this.signature = 'Canceled(address,bytes32,uint256,bytes)';
    this.hexSignature = '0xd744c1c5cd64d72ad94554c85175294ff7a51c795e9ffba8fd82b2be3d3e8699';
    this.contract = GamblingManager;
  }

  async process(log) {
    return [log];
  }
};
