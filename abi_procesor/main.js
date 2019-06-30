const util = require('util');
const fs = require('fs');
const contractsToProcess = require('./contractsToProcess.json');

async function readFile (path) {
  const readFile = util.promisify(fs.readFile);

  return await readFile(
    path,
    'utf8'
  );
}

async function writeFile (name, content) {
  const writeFile = util.promisify(fs.writeFile);

  return await writeFile(
    name,
    content
  );
}

async function main () {
  for (let i = 0; i < contractsToProcess.length; i++) {
    const contractPath = contractsToProcess[i];
    const contractContent = JSON.parse(await readFile(contractPath));
    const contractAbi = contractContent.abi;

    for (let j = 0; j < contractAbi.length; j++) {
      if (contractAbi[j].type === 'event') {
        writeFile (contractAbi[j].name, 'handlerTemplate');
        console.log(contractAbi[j].type);
      }
    }
  }
}

main();
