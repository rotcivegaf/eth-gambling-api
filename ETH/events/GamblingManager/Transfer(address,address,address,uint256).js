const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Transfer(address,address,address,uint256)';
module.exports.hexSignature = '0xd1398bee19313d6bf672ccb116e51f4a1a947e91c757907f51fbb5b5e56c698f';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Transfer(address,address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
