module.exports = class Event {
  constructor(address) {
    this.signature = '';
    this.hexSignature = '';
    this.address = address;
    this.inputs = [];
  }

  async decodeLog(log) {
    if (log.data == '0x')
      log.data = '';

    return process.w3Utils.w3.eth.abi.decodeLog(this.inputs, log.data, log.topics.slice(1));
  }
};
