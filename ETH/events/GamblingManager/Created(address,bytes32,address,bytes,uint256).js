const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Created(address,bytes32,address,bytes,uint256)';
module.exports.hexSignature = '0xc4317439075cf670016d9fff15c98babe21304c2c393e72a80d34d993779e70a';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Created(address,bytes32,address,bytes,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
