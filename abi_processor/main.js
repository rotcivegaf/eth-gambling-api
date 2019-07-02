const util = require('util');
const fs = require('fs');

async function readFile (path) {
  const readFile = util.promisify(fs.readFile);

  return await readFile(path, 'utf8');
}

async function writeFile (name, content) {
  const writeFile = util.promisify(fs.writeFile);

  return await writeFile(name, content);
}

async function existsSync (dir) {
  let ret;
  try {
    ret = await fs.existsSync(dir);
  } catch(error) {
    console.log(error);
  }

  return ret;
}

async function mkdirSync (dir) {
  const mkdirSync = util.promisify(fs.mkdirSync);

  return await mkdirSync(dir);
}

async function readdir (dir) {
  const readdir = util.promisify(fs.readdir);

  return await readdir(dir);
}

async function main () {
  const eventProcessorTemplate = await readFile('./abi_processor/templates/eventProcessor');
  const contractsToProcess = await readdir('./build/contracts');

  const eventProcessorDir = './build/eventProcessor';

  if (!(await existsSync(eventProcessorDir)))
    mkdirSync(eventProcessorDir);

  contractsToProcess.forEach( async (contract)  => {
    const contractPath = './build/contracts/' + contract;
    const contractContent = JSON.parse(await readFile(contractPath));
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
    if (!(await existsSync(contractDir)))
      mkdirSync(contractDir);

    contractAbi.forEach( async (e)  => {
      if (e.type === 'event') {
        let eventProcessor = eventProcessorTemplate.split('/*CONTRACT_NAME*/').join(contractContent.contractName);
        eventProcessor = eventProcessor.split('/*EVENT_NAME*/').join(e.name);
        writeFile (contractDir + '/' + e.name + '.js', eventProcessor);
      }
    });
  });
}

main();
