module.exports = class Event {
  constructor() {
    this.signature = '';
    this.hexSignature = '';
    this.inputs = [];
  }

  decodeLog(log) {
    if (log.data == '0x')
      log.data = '';

    return process.w3Utils.w3.eth.abi.decodeLog(this.inputs, log.data, log.topics.slice(1));
  }
};
