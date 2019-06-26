const w3Utils = require('./w3Utils.js');
const contracts = require('./contracts.js');

const env = require('./environment.js');

module.exports.main = async () => {
  for (let i = 0; true; ) {
    const lastBlockNumber = await w3Utils.getBlockNumber();

    if(i == lastBlockNumber) {
      await w3Utils.sleep(2000);
    } else {
      if (Math.abs(i - lastBlockNumber) < env.interval) {
        await w3Utils.getPastLogs(contracts.addresses, i, lastBlockNumber);
        console.log('get: ' + i + ' to ' + lastBlockNumber + ' blocks logs, interval: ' + Math.abs(i - lastBlockNumber));
        i = lastBlockNumber;
      } else {
        const j = i + env.interval;
        console.log('get: ' + i + ' to ' + j + ' blocks logs, interval: ' + env.interval);
        const logs = await w3Utils.getPastLogs(contracts.addresses, i, j);

        if(logs != '')
          console.log('logs');

        i = j;
      }
    }
  }
};

this.main();
