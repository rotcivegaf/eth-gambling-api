const GamblingManager = require('./GamblingManager.js');

module.exports = class Collected_09c4f65d extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Collected(address,bytes32,address,uint256,bytes)';
    this.hexSignature = '0x09c4f65d7f2abc599371a31f6965ff6c7ac7f452d3623419351a1ea55a41cd76';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_collecter',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': '_id',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_beneficiary',
        'type': 'address'
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

    // Save the collect
    const keyCollect = ['bet', event._id, 'collects'].join(':');

    const betCollect = {
      sender: event._sender,
      beneficiary: event._beneficiary,
      amount: event._amount.toString(),
      data: event._data
    };

    await process.redis.rpushAsync(keyCollect, JSON.stringify(betCollect));
  }
};
