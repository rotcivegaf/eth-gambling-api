const Event = require('../Event.js');
const P2PJson = require('../../build/contracts/P2P.json');

module.exports = class P2P extends Event {
  constructor() {
    super();

    this.contractName = P2PJson.contractName;
  }
};
