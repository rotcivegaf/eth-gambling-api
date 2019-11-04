const logger = require('./logger.js');

module.exports = class LogProcessor {
  constructor() {
    // This attr storage the process method of each events of the contracts
    this.eventsContracts = this.initEventsContracts();
  }

  async process(log) {
    const event = this.eventsContracts[log.address][log.topics[0]];
    const contractName = process.environment.contracts.find(c => c.address === log.address).name;

    logger.log(contractName, event.signature);

    return await event.process(log);
  }

  initEventsContracts () {
    const eventsContracts = [];

    for (let contract of process.environment.contracts) {
      const events = [];

      for (let obj of contract.abi) {
        if (obj.type === 'event') {
          const Event = require('../ETH/events/' + contract.name + '/' + this.getName(obj) + '.js');
          const event = new Event(process.w3Utils, process.redisClient);

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

    const hexSignature = process.w3Utils.w3.eth.abi.encodeEventSignature(signature);
    const name = signature.split('(')[0];
    const hexBytes4 = hexSignature.slice(2, 10);

    return name + '_' + hexBytes4;
  }
};
