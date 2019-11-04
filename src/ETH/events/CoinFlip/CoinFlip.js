const Event = require('../Event.js');
const CoinFlipJson = require('../../build/contracts/CoinFlip.json');

module.exports = class CoinFlip extends Event {
  constructor() {
    super();

    this.contractName = CoinFlipJson.contractName;
  }
};
