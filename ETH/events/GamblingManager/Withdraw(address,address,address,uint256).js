const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Withdraw(address,address,address,uint256)';
module.exports.hexSignature = '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Withdraw(address,address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
