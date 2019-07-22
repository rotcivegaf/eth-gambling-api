const Event = require('../Event.js');
const /*CONTRACT_NAME*/ = require('../../build/contracts//*CONTRACT_NAME*/.json');

module.exports = class /*EVENT_NAME*/_/*EVENT_SIGNATURE_BYTES4*/ extends Event {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.contract = /*CONTRACT_NAME*/;

    this.signature = '/*EVENT_SIGNATURE*/';
    this.hexSignature = '/*EVENT_HEX_SIGNATURE*/';
    this.inputs = /*EVENT_INPUTS*/;
  }

  async process(log) {
  }
};
