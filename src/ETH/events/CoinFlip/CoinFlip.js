const Event = require('../Event.js');
const CoinFlipJson = require('../../build/contracts/CoinFlip.json');

module.exports = class CoinFlip extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = CoinFlipJson;
  }
};
