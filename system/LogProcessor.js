const contracts = require('./contracts.js');

module.exports = class LogProcessor {
  constructor() {
    this.contracts = {};

    for (let i = 0; i < contracts.data.length; i++) {
      const contract = contracts.data[i];
      const events = {};

      for (let j = 0; j < contract.abi.length; j++) {
        const event = contract.abi[j];
        if (event.type === 'event') {
          const aux = require('./events/' + contract.name + '/' + getSignature(event) + '.js');
          events[aux.hexSignature] = aux;
        }
      }

      this.contracts[contract.address] = events;
    }
  }

  async process(log) {
    console.log(this.contracts[log.address][log.topics[0]]);
    return this.contracts[log.address][log.topics[0]];
  }
};



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
