const asyncFs = require('./asyncFs.js');
const W3 = require('web3');

const w3 = new W3();

async function getSignature (event) {
  let signature = event.name + '(';
  if (event.inputs.length > 0) {
    event.inputs.forEach(async (input) => {
      signature += input.type + ',';
    });
    signature = signature.slice(0, -1);
  }
  signature += ')';

  return {
    signature: signature,
    hexSignature: await w3.utils.soliditySha3({ t: 'string', v: signature})
  };
}

async function main () {
  const eventProcessorTemplate = await asyncFs.readFile('./abi_processor/templates/event');
  const contractsToProcess = await asyncFs.readdir('./system/contracts/');

  const eventProcessorDir = './system/events';

  if (!(await asyncFs.existsSync(eventProcessorDir)))
    await asyncFs.mkdirSync(eventProcessorDir);

  contractsToProcess.forEach( async (contract)  => {
    const contractPath = './system/contracts/' + contract;
    const contractContent = JSON.parse(await asyncFs.readFile(contractPath));
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
    if (!(await asyncFs.existsSync(contractDir)))
      await asyncFs.mkdirSync(contractDir);

    contractAbi.forEach( async (e)  => {
      if (e.type === 'event') {
        const signature = await getSignature(e);
        let eventProcessor = eventProcessorTemplate.split('/*CONTRACT_NAME*/').join(contractContent.contractName);
        eventProcessor = eventProcessor.split('/*EVENT_SIGNATURE*/').join(signature.signature);
        eventProcessor = eventProcessor.split('/*EVENT_HEX_SIGNATURE*/').join(signature.hexSignature);
        await asyncFs.writeFile (contractDir + '/' + signature.signature + '.js', eventProcessor);
      }
    });
  });
}

main();
