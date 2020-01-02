const GamblingManager = require('./GamblingManager.js');

module.exports = class ModelTransfer_0beecb55 extends GamblingManager {
  constructor() {
    super();

    this.signature = 'ModelTransfer(bytes32,address,uint256)';
    this.hexSignature = '0x0beecb5526acb0cbfa50f481ee6ddbcef5430db81beb1e4254a2113a25182e7f';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'bytes32',
        'name': '_id',
        'type': 'bytes32'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_beneficiary',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
    const event = await this.decodeLog(log);

    const keyBet = ['bet', event._id].join(':');
    const bet = JSON.parse(await process.redis.getAsync(keyBet));

    bet.amount = process.w3Utils.subToString(bet.amount, event._amount);

    await process.redis.setAsync(keyBet, JSON.stringify(bet));
  }
};
