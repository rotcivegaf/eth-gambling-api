const Event = require('../Event.js');

module.exports = class  extends Event {
  constructor() {
    super();

    this.signature = 'SetWinner(bytes32,bytes32)';
    this.hexSignature = '0xb938316aa50f7fa95059c0db84b67ae243d175908ef0f5e209f3e202f50b9087';
    this.inputs = [
      {
        'indexed': false,
        'name': '_eventId',
        'type': 'bytes32'
      },
      {
        'indexed': false,
        'name': '_optionWin',
        'type': 'bytes32'
      }
    ];
  }

  async process(log) {
    const event = this.decodeLog(log);

    const keyEvent = ['bet', event._eventId].join(':');
    const eventObj = JSON.parse(await process.redis.getAsync(keyEvent));

    eventObj.optionWin = event._optionWin;

    await process.redis.setAsync(keyEvent, JSON.stringify(eventObj));
  }
};
