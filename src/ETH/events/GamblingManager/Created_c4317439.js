const GamblingManager = require('./GamblingManager.js');

module.exports = class Created_c4317439 extends GamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Created(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0xc4317439075cf670016d9fff15c98babe21304c2c393e72a80d34d993779e70a';
    this.inputs = [
      {
        'indexed':true,
        'name':'_sender',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':false,
        'name':'_token',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_data',
        'type':'bytes'
      },
      {
        'indexed':false,
        'name':'_nonce',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);

    const key = ['bet', event._id].join(':');
    const betObj = {
      sender: event._sender,
      token: event._token,
      data: event._data,
      createTipe: 1,
      nonce_salt: event._nonce.toString()
    };

    await this.redis.setAsync(key, JSON.stringify(betObj));
    await this.redis.arrayUniquePush('currencies', event._token);
  }
};
