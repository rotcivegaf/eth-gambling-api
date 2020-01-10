const Event = require('../Event.js');

module.exports = class ApprovalForAll_17307eab extends Event {
  constructor() {
    super();

    this.signature = 'ApprovalForAll(address,address,bool)';
    this.hexSignature = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';
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
        'name': '_operator',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': '_approved',
        'type': 'bool'
      }
    ];
  }

  async process(log) {
  }
};
