const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Approval(address,address,uint256)';
module.exports.hexSignature = '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Approval(address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
