const W3 = require('web3');
const fs = require('fs');

const mkdirAsync = (dir) => {
  try {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.error(err);
  }
};

const w3 = new W3();

function getSignature (event) {
  let signature = event.name + '(';
  if (event.inputs.length > 0) {
    event.inputs.forEach((input) => {
      signature += input.type + ',';
    });
    signature = signature.slice(0, -1);
  }
  signature += ')';
  const hexSignature = w3.utils.soliditySha3({ t: 'string', v: signature});

  return {
    string: signature,
    name: signature.split('(')[0],
    hex: hexSignature,
    hexBytes4: hexSignature.slice(2, 10)
  };
}

function main() {
  const eventProcessorTemplate = fs.readFileSync('./abi_processor/templates/event.js', 'utf8');
  const contractsToProcess = fs.readdirSync('./ETH/build/contracts/');

  const eventProcessorDir = './ETH/events/';
  mkdirAsync(eventProcessorDir);

  contractsToProcess.forEach((contract)  => {
    const contractPath = './ETH/build/contracts/' + contract;
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

    contractAbi.forEach((obj)  => {
      if (obj.type === 'event') {
        const signature = getSignature(obj);
        let eventProcessor = eventProcessorTemplate.split('/*CONTRACT_NAME*/').join(contractContent.contractName);
        eventProcessor = eventProcessor.split('/*EVENT_SIGNATURE*/').join(signature.string);
        eventProcessor = eventProcessor.split('/*EVENT_HEX_SIGNATURE*/').join(signature.hex);
        eventProcessor = eventProcessor.split('/*EVENT_NAME*/').join(signature.name);
        eventProcessor = eventProcessor.split('/*EVENT_SIGNATURE_BYTES4*/').join(signature.hexBytes4);

        fs.writeFileSync(contractDir + '/' + signature.name + '_' + signature.hexBytes4 + '.js', eventProcessor);
      }
    });
  });
}

main();
