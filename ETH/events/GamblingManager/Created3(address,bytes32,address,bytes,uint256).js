const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Created3(address,bytes32,address,bytes,uint256)';
module.exports.hexSignature = '0x8ea2673206c8d0d25f9edd4478e0560ec03cb5ff6c31fcaf40d6ff572c159d5e';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Created3(address,bytes32,address,bytes,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
