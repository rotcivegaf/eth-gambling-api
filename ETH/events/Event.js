const w3Utils = require('../../processor/w3Utils.js');

module.exports = class Event {
  cosntructor() {
    this.signature = '';
    this.hexSignature = '';
    this.contract = undefined;
    this.inputs = [];
  }

  async process(log) {
    return [log];
  }

  decodeLog(log) {
    return w3Utils.w3.eth.abi.decodeLog(this.inputs, log.data, log.topics.slice(1));
  }
};
