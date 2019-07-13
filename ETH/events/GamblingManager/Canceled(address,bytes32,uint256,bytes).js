const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports.signature = 'Canceled(address,bytes32,uint256,bytes)';
module.exports.hexSignature = '0xd744c1c5cd64d72ad94554c85175294ff7a51c795e9ffba8fd82b2be3d3e8699';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Canceled(address,bytes32,uint256,bytes)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
