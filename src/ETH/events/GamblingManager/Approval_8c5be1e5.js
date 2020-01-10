const Event = require('../Event.js');

module.exports = class Approval_8c5be1e5 extends Event {
  constructor() {
    super();

    this.signature = 'Approval(address,address,uint256)';
    this.hexSignature = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';
    this.inputs = [
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': '_approved',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': '_tokenId',
        'type': 'uint256'
      }
    ];
  }

  async process(log) {
  }
};
