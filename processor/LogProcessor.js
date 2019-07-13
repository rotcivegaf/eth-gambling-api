const contracts = require('../ETH/contracts.js');

module.exports = class LogProcessor {
  constructor() {
    // This attr storage the process method of each events of the contracts
    this.eventsContracts = initEventsContracts();
  }

  async process(log) {
    return await this.eventsContracts[log.address][log.topics[0]].process(log);
  }
};

function initEventsContracts () {
  const eventsContracts = {};

  for (let i = 0; i < contracts.data.length; i++) {
    const contract = contracts.data[i];
    const events = {};

    for (let j = 0; j < contract.abi.length; j++) {
      const event = contract.abi[j];
      if (event.type === 'event') {
        const eventFile = require('../ETH/events/' + contract.name + '/' + getSignature(event) + '.js');
        events[eventFile.hexSignature] = eventFile;
      }
    }

    eventsContracts[contract.address] = events;
  }

  return eventsContracts;
}

// Auxiliar function to get the signature of the event
// input: event abi object return a signature of the event in string
// In example: return eventA(addres,uint,bytes32)
function getSignature (event) {
  let signature = event.name + '(';
  if (event.inputs.length > 0) {
    event.inputs.forEach((input) => {
      signature += input.type + ',';
    });
    signature = signature.slice(0, -1);
  }
  signature += ')';

  return signature;
}
