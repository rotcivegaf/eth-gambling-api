const ContractEvent = require('./ContractEvent.js');

module.exports = class P2P extends ContractEvent {
  constructor(address, name, abi) {
    super(address, name, abi);
  }

  toParams (data) {
    data = data.slice(2);
    const n = data.length / 64;
    const params = [];

    for (let i = 0; i < n; i++) {
      const start = i * 64;
      params.push('0x' + data.slice(start, start + 64));
    }

    return params;
  }

  async createPostProcess(log, event) {
    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    const params = this.toParams(event._data);
    bet.modelObj = {
      eventId: params[0],
      ownerOption: params[1],
      ownerAmount: params[2],
      playerAmount: params[3],
    };
    bet.modelName = this.name;

    await process.redis.setAsync(keyBet, JSON.stringify(bet));
  }

  async playPostProcess(log, event) {
    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    const params = this.toParams(event._data);
    bet.modelObj.playerOption = params[0];

    await process.redis.setAsync(keyBet, JSON.stringify(bet));
  }

  async cancelPostProcess(log, event) {
    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    bet.modelObj.cancel = true;

    await process.redis.setAsync(keyBet, JSON.stringify(bet));
  }
};
