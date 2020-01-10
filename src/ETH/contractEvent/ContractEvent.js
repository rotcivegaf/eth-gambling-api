module.exports = class ContractEvent {
  constructor(address, name, abi) {
    this.address = address;
    this.name = name;
    this.abi = abi;
    this.events = this.initEvents();
  }

  initEvents() {
    const events = {};
    // Add events
    for (const obj of this.abi) {
      if (obj.type === 'event') {
        const Event = require('../events/' + this.name + '/' + this.getEventName(obj) + '.js');
        const event = new Event(this.address);

        events[event.hexSignature] = event;
      }
    }

    return events;
  }

  async process (log) {
    await this.getEvent(log).process(log);
  }

  getEvent (log) {
    return this.events[log.topics[0]];
  }

  getEventName (event) {
    let signature = event.name + '(';
    if (event.inputs.length > 0) {
      event.inputs.forEach((input) => {
        signature += input.type + ',';
      });
      signature = signature.slice(0, -1);
    }
    signature += ')';

    const hexSignature = process.w3Utils.w3.eth.abi.encodeEventSignature(signature);
    const name = signature.split('(')[0];
    const hexBytes4 = hexSignature.slice(2, 10);

    return name + '_' + hexBytes4;
  }
};
