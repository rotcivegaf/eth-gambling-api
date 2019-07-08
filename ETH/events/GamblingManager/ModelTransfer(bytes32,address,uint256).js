const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'ModelTransfer(bytes32,address,uint256)';
module.exports.hexSignature = '0x0beecb5526acb0cbfa50f481ee6ddbcef5430db81beb1e4254a2113a25182e7f';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'ModelTransfer(bytes32,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
