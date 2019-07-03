const w3Utils = require('./w3Utils.js');
const contracts = require('./contracts.js');
const dBConnector = require('./dBConnector.js');
const LogProcessor = require('./LogProcessor.js');

const env = require('./environment.js');

module.exports.main = async () => {
  const logProcessor = new LogProcessor();

  for (let from = env.startBlock, to = 0; ;) {
    const lastBlock = await w3Utils.getBlock('latest');

    if(from >= lastBlock.number) { // dont have events
      await w3Utils.sleep(2000);
      console.log('Wait: 2000 ms');
    } else { // haves events
      to = Math.abs(from - lastBlock.number) < env.interval ? lastBlock.number : from + env.interval;

      console.log('get: ' + from + ' to ' + to + ' blocks logs, interval: ' + (to - from));
      const logs = await w3Utils.getPastLogs(contracts.addresses, from, to);
      console.log(logs.length);
      for (let i = 0; i <= logs.length; i++) {
        const log = logs[i];
        const commit = await logProcessor.process(log);


        console.log(commit);

        await w3Utils.sleep(2000000);


        await dBConnector.commit(commit);
      }

      from = to;
    }
  }
};

this.main();
