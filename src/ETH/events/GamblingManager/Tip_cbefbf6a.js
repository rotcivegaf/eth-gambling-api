const gamblingManager = require('./GamblingManager.js');

module.exports = class Tip_cbefbf6a extends gamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Tip(address,address,uint256)';
    this.hexSignature = '0xcbefbf6a902aa93a9aafdd30aefd16e61f6c015bbf5fcaccfdf1d29d0c84e7d0';
    this.inputs = [
      {
        'indexed':true,
        'name':'_from',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_token',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_amount',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);

    const keyPush = ['tip', 'token', event._token].join(':');
    const valueObj = {
      from: event._from,
      amount: event._amount.toString()
    };

    await this.redis.arrayPush(keyPush, JSON.stringify(valueObj));
  }
};
