const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Collected(address,bytes32,address,uint256,bytes)';
module.exports.hexSignature = '0x09c4f65d7f2abc599371a31f6965ff6c7ac7f452d3623419351a1ea55a41cd76';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Collected(address,bytes32,address,uint256,bytes)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
