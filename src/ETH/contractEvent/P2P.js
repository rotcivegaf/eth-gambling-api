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
    const key = [this.contractName, 'bet', event._id].join(':');

    const params = this.toParams(event._data);
    const p2pBetObj = {
      eventId: params[0],
      ownerOption: params[1],
      ownerAmount: params[2],
      playerAmount: params[3],
    };

    await process.redis.setAsync(key, JSON.stringify(p2pBetObj));
  }

  async playPostProcess(log, event) {
    const keyP2pBet = [this.contractName, 'bet', event._id].join(':');
    const p2pBet = JSON.parse(await process.redis.getAsync(keyP2pBet));

    const params = this.toParams(event._data);
    p2pBet.playerOption = params[0];

    await process.redis.setAsync(keyP2pBet, JSON.stringify(p2pBet));
  }

  async cancelPostProcess(log, event) {
    const keyP2pBet = [this.contractName, 'bet', event._id].join(':');
    const p2pBet = JSON.parse(await process.redis.getAsync(keyP2pBet));

    p2pBet.cancel = true;

    await process.redis.setAsync(keyP2pBet, JSON.stringify(p2pBet));
  }
};
