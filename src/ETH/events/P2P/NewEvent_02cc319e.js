const Event = require('../Event.js');

module.exports = class NewEvent extends Event {
  constructor() {
    super();

    this.signature = 'NewEvent(address,bytes32,string,uint256,bytes32,bytes32)';
    this.hexSignature = '0x02cc319e7f4451ab7313544de50756c5de575f6de5d37d5ee6efed8f2cda84b0';
    this.inputs = [
      {
        'indexed': false,
        'name': '_owner',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_eventId',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': '_name',
        'type': 'string'
      },
      {
        'indexed': false,
        'name': '_noMoreBets',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'name': '_optionA',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': '_optionB',
        'type': 'bytes32'
      }
    ];
  }

  async process(log) {
    const event = this.decodeLog(log);

    const key = ['event', event._eventId].join(':');

    const eventObj = {
      eventId: event._eventId,
      owner: event._owner,
      name: event._name,
      optionWin: process.w3Utils.bytes320x,
      optionA: event._optionA,
      optionB: event._optionB,
      noMoreBets: event._noMoreBets,
    };

    await process.redis.setAsync(key, JSON.stringify(eventObj));
  }
};
