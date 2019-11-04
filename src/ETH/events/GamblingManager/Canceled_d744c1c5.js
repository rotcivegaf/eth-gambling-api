const GamblingManager = require('./GamblingManager.js');

module.exports = class Canceled_d744c1c5 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Canceled(address,bytes32,uint256,bytes)';
    this.hexSignature = '0xd744c1c5cd64d72ad94554c85175294ff7a51c795e9ffba8fd82b2be3d3e8699';
    this.inputs = [
      {
        'indexed':true,
        'name':'_sender',
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
    const event = await this.decodeLog(log);

    const keyCancel = ['bet', event._id, 'cancel'].join(':');

    const betCancelObj = {
      sender: event._sender,
      amount: event._amount.toString(),
      data: event._data
    };

    await process.redis.setAsync(keyCancel, JSON.stringify(betCancelObj));
  }
};
