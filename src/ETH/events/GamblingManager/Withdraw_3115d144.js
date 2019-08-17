const GamblingManager = require('./GamblingManager.js');

module.exports = class Withdraw_3115d144 extends GamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Withdraw(address,address,address,uint256)';
    this.hexSignature = '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7';
    this.inputs = [
      {
        'indexed':true,
        'name':'_from',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_to',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_token',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_value',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);

    const keySub = ['user', event._from, 'token', event._token, 'balance'].join(':');
    await this.redis.sub(keySub, event._value.toString());
  }
};
