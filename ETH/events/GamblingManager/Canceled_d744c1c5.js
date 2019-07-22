const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Canceled_d744c1c5 extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = GamblingManager;

    this.signature = 'Canceled(address,bytes32,uint256,bytes)';
    this.hexSignature = '0xd744c1c5cd64d72ad94554c85175294ff7a51c795e9ffba8fd82b2be3d3e8699';
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
        'name':'_amount',
        'type':'uint256'
      },
      {
        'indexed':false,
        'name':'_data',
        'type':'bytes'
      }
    ];
  }

  async process(log) {
  }
};
