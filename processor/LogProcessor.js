const contracts = require('../ETH/contracts.js');
const w3Utils = require('./w3Utils.js');

module.exports = class LogProcessor {
  constructor(logger) {
    // This attr storage the process method of each events of the contracts
    this.eventsContracts = initEventsContracts();
    this.logger = logger;
  }

  async process(log) {
    const event = this.eventsContracts[log.address][log.topics[0]];
    const contractName = contracts.getName(log.address);

    this.logger.log(contractName, event.signature);
    console.log(log);

    return await event.process(log);
  }
};

function initEventsContracts () {
  const eventsContracts = {};

  for (const contract of contracts.data) {
    const events = {};

    for (const obj of contract.abi) {
      if (obj.type === 'event') {
        const Event = require('../ETH/events/' + contract.name + '/' + getName(obj) + '.js');
        const event = new Event();
        events[event.hexSignature] = event;
      }
    }

    eventsContracts[contract.address] = events;
  }

  return eventsContracts;
}

function getName (event) {
  let signature = event.name + '(';
  if (event.inputs.length > 0) {
    event.inputs.forEach((input) => {
      signature += input.type + ',';
    });
    signature = signature.slice(0, -1);
  }
  signature += ')';

  const hexSignature = w3Utils.w3.utils.soliditySha3({ t: 'string', v: signature});
  const name = signature.split('(')[0];
  const hexBytes4 = hexSignature.slice(2, 10);

  return name + '_' + hexBytes4;
}
