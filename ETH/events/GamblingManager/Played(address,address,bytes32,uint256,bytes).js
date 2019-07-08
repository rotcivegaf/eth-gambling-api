const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Played(address,address,bytes32,uint256,bytes)';
module.exports.hexSignature = '0x0fae47ae36129d8fe9ddc5fbd1a558565eb472b1a08c9e2e23687ddfc83dcef4';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Played(address,address,bytes32,uint256,bytes)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
