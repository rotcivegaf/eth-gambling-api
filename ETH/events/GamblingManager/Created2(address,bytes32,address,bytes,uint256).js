const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Created2(address,bytes32,address,bytes,uint256)';
module.exports.hexSignature = '0x74da973888be896e232abd439b13097a4319d859b05de4bf9ecd2c9ab712cf56';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Created2(address,bytes32,address,bytes,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
