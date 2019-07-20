const Event = require('../Event.js');
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports = class Transfer_ddf252ad extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = GamblingManager;

    this.signature = 'Transfer(address,address,uint256)';
    this.hexSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
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
        'name':'_tokenId',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const erc721Id = this.numberToHex(event._tokenId);

    await this.removeUserToken(event._to, erc721Id);
    await this.pushUserToken(event._to, erc721Id);

    return [log];
  }

  async removeUserToken(userAddress, erc721Id) {
    if (userAddress === this.w3Utils.address0x) return;

    const key = this.concatKeys('user:' + userAddress, 'tokens');

    let userTokens = await this.redis.getAsync(key);
    userTokens = userTokens.split(',');

    const index = userTokens.indexOf(erc721Id);
    if (index !== -1)
      userTokens.splice(index, 1);
    else
      console.error('The token not exists in the userTokens');

    await this.redis.setAsync(key, userTokens);
  }

  async pushUserToken(userAddress, erc721Id) {
    const key = this.concatKeys('user:' + userAddress, 'tokens');

    let userTokens = await this.redis.getAsync(key);
    userTokens = userTokens === null ?  [] : userTokens.split(',');
    userTokens.push(erc721Id);

    await this.redis.setAsync(key, userTokens);
  }
};
