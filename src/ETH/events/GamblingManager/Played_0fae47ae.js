const Event = require('../Event.js');

module.exports = class Played_0fae47ae extends Event {
  constructor() {
    super();

    this.signature = 'Played(address,address,bytes32,uint256,bytes)';
    this.hexSignature = '0x0fae47ae36129d8fe9ddc5fbd1a558565eb472b1a08c9e2e23687ddfc83dcef4';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_sender',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_player',
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
    const event = this.decodeLog(log);

    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    bet.amount = process.w3Utils.addToString(bet.amount, event._amount);

    await process.redis.setAsync(keyBet, JSON.stringify(bet));

    // Add to history
    const keyPlay = ['bet', event._id, 'plays'].join(':');

    const betPlayObj = {
      sender: event._sender,
      player: event._player,
      amount: event._amount.toString(),
      data: event._data
    };

    await process.redis.rpushAsync(keyPlay, JSON.stringify(betPlayObj));

    try {
      const model = process.eventsContracts[bet.model];
      await model.playPostProcess(log, event);
    } catch (error) {
      console.log(error);
    }
  }
};
