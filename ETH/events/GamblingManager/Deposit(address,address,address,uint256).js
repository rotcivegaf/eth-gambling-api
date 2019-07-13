const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports.signature = 'Deposit(address,address,address,uint256)';
module.exports.hexSignature = '0x7cfff908a4b583f36430b25d75964c458d8ede8a99bd61be750e97ee1b2f3a96';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Deposit(address,address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
