const /*CONTRACT_NAME*/ = require('.//*CONTRACT_NAME*/.js');

module.exports = class /*EVENT_NAME*/_/*EVENT_SIGNATURE_BYTES4*/ extends /*CONTRACT_NAME*/ {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = '/*EVENT_SIGNATURE*/';
    this.hexSignature = '/*EVENT_HEX_SIGNATURE*/';
    this.inputs = /*EVENT_INPUTS*/;
  }

  async process(log) {
  }
};
