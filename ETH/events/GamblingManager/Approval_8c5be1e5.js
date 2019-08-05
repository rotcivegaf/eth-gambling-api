const gamblingManager = require('./GamblingManager.js');

module.exports = class Approval_8c5be1e5 extends gamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'Approval(address,address,uint256)';
    this.hexSignature = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
    this.inputs = [
      {
        'indexed':true,
        'name':'_owner',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_approved',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_tokenId',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
  }
};
