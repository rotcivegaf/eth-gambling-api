const contracts = require('../ETH/contracts.js');

module.exports = class LogProcessor {
  constructor(w3Utils, redisClient, logger) {
    this.w3Utils = w3Utils;
    this.redisClient = redisClient;
    this.logger = logger;
    // This attr storage the process method of each events of the contracts
    this.eventsContracts = this.initEventsContracts();
  }

  async process(log) {
    const event = this.eventsContracts[log.address][log.topics[0]];
    const contractName = contracts.getName(log.address);

    this.logger.log(contractName, event.signature);

    return await event.process(log);
  }

  initEventsContracts () {
    const eventsContracts = {};

    for (const contract of contracts.data) {
      const events = {};

      for (const obj of contract.abi) {
        if (obj.type === 'event') {
          const Event = require('../ETH/events/' + contract.name + '/' + this.getName(obj) + '.js');
          const event = new Event(this.w3Utils, this.redisClient);
          events[event.hexSignature] = event;
        }
      }

      eventsContracts[contract.address] = events;
    }

    return eventsContracts;
  }

  getName (event) {
    let signature = event.name + '(';
    if (event.inputs.length > 0) {
      event.inputs.forEach((input) => {
        signature += input.type + ',';
      });
      signature = signature.slice(0, -1);
    }
    signature += ')';

    const hexSignature = this.w3Utils.w3.eth.abi.encodeEventSignature(signature);
    const name = signature.split('(')[0];
    const hexBytes4 = hexSignature.slice(2, 10);

    return name + '_' + hexBytes4;
  }
};
