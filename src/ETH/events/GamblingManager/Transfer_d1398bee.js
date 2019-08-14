const GamblingManager = require('./GamblingManager.js');

module.exports = class Transfer_d1398bee extends GamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Transfer(address,address,address,uint256)';
    this.hexSignature = '0xd1398bee19313d6bf672ccb116e51f4a1a947e91c757907f51fbb5b5e56c698f';
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

    const keySub = ['user', event._from, 'token', event._token].join(':');
    await this.redis.sub(keySub, event._value.toString());

    const keyAdd = ['user', event._to, 'token', event._token].join(':');
    await this.redis.add(keyAdd, event._value.toString());
  }
};
