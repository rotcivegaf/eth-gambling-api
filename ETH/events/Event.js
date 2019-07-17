module.exports = class Event {
  cosntructor() {
    this.signature = '';
    this.hexSignature = '';
    this.contract = undefined;
  }

  async process(log) {
    return [log];
  }
};
