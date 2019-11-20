const GamblingManager = require('./GamblingManager.js');

module.exports = class Transfer_ddf252ad extends GamblingManager {
  constructor() {
    super();

    this.signature = 'Transfer(address,address,uint256)';
    this.hexSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    this.inputs = [
      {
        'indexed': true,
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': '_tokenId',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);
    const erc721Id = process.w3Utils.numberToHex(event._tokenId);

    if (event._from !== process.w3Utils.address0x) {
      const keyRemove = ['user', event._from, 'bets'].join(':');
      await process.redis.lremAsync(keyRemove, 0, erc721Id);
    } else {
      // TODO do something...
      // New Bet(ERC721)
    }

    const keyPush = ['user', event._to, 'bets'].join(':');
    await process.redis.rpushAsync(keyPush, erc721Id);
  }
};
