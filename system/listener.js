const w3Utils = require('./w3Utils.js');
const contracts = require('./contracts.js');

const env = require('./environment.js');

module.exports.main = async () => {
  for (let i = 0;;) {
    const lastBlock = await w3Utils.getBlock('latest');

    if(i == lastBlock.number) {
      await w3Utils.sleep(2000);
      console.log('Wait: 2000 ms');
    } else {
      if (Math.abs(i - lastBlock.number) < env.interval) {
        await w3Utils.getPastLogs(contracts.addresses, i, lastBlock.number);
        console.log('get: ' + i + ' to ' + lastBlock.number + ' blocks logs, interval: ' + Math.abs(i - lastBlock.number));
        i = lastBlock.number;
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
