const GamblingManager = require('./GamblingManager.js');

module.exports = class Canceled_d744c1c5 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Canceled(address,bytes32,uint256,bytes)';
    this.hexSignature = '0xd744c1c5cd64d72ad94554c85175294ff7a51c795e9ffba8fd82b2be3d3e8699';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_creator',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': '_id',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);

    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    bet.amount = process.w3Utils.subToString(bet.amount, event._amount);

    await process.redis.setAsync(keyBet, JSON.stringify(bet));

    // Save cancel debt
    const keyCancel = ['bet', event._id, 'cancel'].join(':');

    const betCancelObj = {
      sender: event._sender,
      amount: event._amount.toString(),
      data: event._data
    };

    await process.redis.setAsync(keyCancel, JSON.stringify(betCancelObj));
  }
};
