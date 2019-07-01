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

  for (let i = 0; i < contractsToProcess.length; i++) {
    const contractPath = './build/contracts/' + contractsToProcess[i];
    const contractContent = JSON.parse(await readFile(contractPath));
    const contractAbi = contractContent.abi;

    if(
      contractContent.contractName.slice(0,4) === 'Test' ||
      contractContent.bytecode === '0x' ||
      typeof contractAbi === 'undefined' ||
      contractAbi.length === 0 ||
      typeof contractAbi.find(x => x.type  === 'event') === 'undefined'
    ){
      continue;
    }

    const contractDir = eventProcessorDir + '/' + contractContent.contractName;
    if (!(await existsSync(contractDir)))
      mkdirSync(contractDir);

    for (let j = 0; j < contractAbi.length; j++) {
      if (contractAbi[j].type === 'event') {
        const eventProcessor = eventProcessorTemplate.split('/*CONTRACT_NAME*/').join(contractAbi[j].name);
        writeFile (contractDir + '/' + contractAbi[j].name + '.js', eventProcessor);
      }
    }
  }
}

main();
