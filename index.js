const init = require('./src/init.js');
const api = require('./src/api.js');

async function main() {
  await init();

  process.processor.process();
  api();
}

main();
