const Event = require('../Event.js');
const /*CONTRACT_NAME*/Json = require('../../build/contracts//*CONTRACT_NAME*/.json');

module.exports = class /*CONTRACT_NAME*/ extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = /*CONTRACT_NAME*/Json;
  }
};
