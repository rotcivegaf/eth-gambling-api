const W3 = require('web3');
const fs = require('fs');

const mkdirAsync = (dir) => {
  try {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const w3 = new W3();

function stringify(inputs) {
  inputs = JSON.stringify(inputs);
  if(inputs == '[]') return inputs;
  inputs = inputs.replace(new RegExp('"', 'g'), '\'');
  inputs = inputs.replace(new RegExp('\\[', 'g'), '[\n      ');
  inputs = inputs.replace(new RegExp('\\{', 'g'), '{\n        ');
  inputs = inputs.replace(new RegExp('\\}', 'g'), '\n      }');
  inputs = inputs.replace(new RegExp('\\]', 'g'), '\n    ]');
  inputs = inputs.replace(new RegExp('\\,\\{', 'g'), ',\n      {');
  return inputs.replace(new RegExp('\\,\'', 'g'), ',\n        \'');
}

function getSignature (event) {
  let signature = event.name + '(';
  if (event.inputs.length > 0) {
    event.inputs.forEach((input) => {
      signature += input.type + ',';
    });
    signature = signature.slice(0, -1);
  }
  signature += ')';
  const hexSignature = w3.eth.abi.encodeEventSignature(signature);

  return {
    string: signature,
    name: signature.split('(')[0],
    hex: hexSignature,
    hexBytes4: hexSignature.slice(2, 10)
  };
}

function main() {
  const eventTemplate = fs.readFileSync('./src/abi_processor/templates/event.js', 'utf8');
  const contractTemplate = fs.readFileSync('./src/abi_processor/templates/contract.js', 'utf8');
  const contractsToProcess = fs.readdirSync('./src/ETH/build/contracts/');

  const eventProcessorDir = './src/ETH/events/';
  mkdirAsync(eventProcessorDir);

  contractsToProcess.forEach((contract)  => {
    const contractPath = './src/ETH/build/contracts/' + contract;
    const contractContent = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    const contractAbi = contractContent.abi;

    if(
      contractContent.contractName.slice(0,4) === 'Test' ||
      contractContent.bytecode === '0x' ||
      typeof contractAbi === 'undefined' ||
      contractAbi.length === 0 ||
      typeof contractAbi.find(x => x.type  === 'event') === 'undefined'
    ){
      return;
    }

    const contractDir = eventProcessorDir + '/' + contractContent.contractName;
    mkdirAsync(contractDir);

    const contractJsDir = contractDir + '/' + contractContent.contractName + '.js';

    if (!fs.existsSync(contractJsDir)){
      const contract = contractTemplate.split('/*CONTRACT_NAME*/').join(contractContent.contractName);
      fs.writeFileSync(contractJsDir, contract);
    }

    contractAbi.forEach((obj)  => {
      if (obj.type === 'event') {
        const signature = getSignature(obj);
        const eventDir = contractDir + '/' + signature.name + '_' + signature.hexBytes4 + '.js';

        if (!fs.existsSync(eventDir)){
          let eventProcessor = eventTemplate.split('/*CONTRACT_NAME*/').join(contractContent.contractName);
          eventProcessor = eventProcessor.split('/*EVENT_SIGNATURE*/').join(signature.string);
          eventProcessor = eventProcessor.split('/*EVENT_INPUTS*/').join(stringify(obj.inputs));
          eventProcessor = eventProcessor.split('/*EVENT_HEX_SIGNATURE*/').join(signature.hex);
          eventProcessor = eventProcessor.split('/*EVENT_NAME*/').join(signature.name);
          eventProcessor = eventProcessor.split('/*EVENT_SIGNATURE_BYTES4*/').join(signature.hexBytes4);

          fs.writeFileSync(eventDir, eventProcessor);
        }
      }
    });
  });
}

main();
