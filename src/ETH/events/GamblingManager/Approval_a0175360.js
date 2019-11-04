const GamblingManager = require('./GamblingManager.js');

module.exports = class Approval_a0175360 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Approval(address,address,address,uint256)';
    this.hexSignature = '0xa0175360a15bca328baf7ea85c7b784d58b222a50d0ce760b10dba336d226a61';
    this.inputs = [
      {
        'indexed':true,
        'name':'_owner',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_spender',
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

    const key = ['user', event._owner, 'token', event._token, 'spender', event._spender, 'approval'].join(':');

    await process.redis.setAsync(key, event._value);
  }
};
