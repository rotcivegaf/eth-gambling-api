const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports.signature = 'Approval(address,address,address,uint256)';
module.exports.hexSignature = '0xa0175360a15bca328baf7ea85c7b784d58b222a50d0ce760b10dba336d226a61';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Approval(address,address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
