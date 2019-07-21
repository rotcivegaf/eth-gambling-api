module.exports = class Event {
  constructor(w3Utils, redisClient) {
    this.w3Utils = w3Utils;
    this.redis = redisClient;
    this.signature = '';
    this.hexSignature = '';
    this.contract = undefined;
    this.inputs = [];
  }

  async process(log) {
    return [log];
  }

  async decodeLog(log) {
    return this.w3Utils.w3.eth.abi.decodeLog(this.inputs, log.data, log.topics.slice(1));
  }
};
