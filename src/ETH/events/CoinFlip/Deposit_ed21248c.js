const Event = require('../Event.js');

module.exports = class Deposit_ed21248c extends Event {
  constructor() {
    super();

    this.signature = 'Deposit()';
    this.hexSignature = '0xed21248cb703b524cc0029bb8669df941baca560163a3bc6ad184e7e9c268070';
    this.inputs = [];
  }

  async process(log) {
  }
};
