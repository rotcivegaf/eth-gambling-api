const GamblingManager = require('./GamblingManager.js');
const { addBet } = require('./Utils.js');

module.exports = class Created3_8ea26732 extends GamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Created3(address,bytes32,address,bytes,uint256)';
    this.hexSignature = '0x8ea2673206c8d0d25f9edd4478e0560ec03cb5ff6c31fcaf40d6ff572c159d5e';
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
        'name':'_salt',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const betObj = {
      createTipe: 3,
      nonce_salt: event._salt.toString()
    };

    await addBet(this.redis, this.w3Utils, this.erc20, event, betObj);
  }
};
