const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports.signature = 'SetMultiplier(uint256,uint256)';
module.exports.hexSignature = '0x7c36f4f09129892bcf3dc5b110d9b3644884bbdd87fa190dcc3b1e9877dc4384';

module.exports.process = async (log) => {
  //const event = utils.getEvent(CoinFlip, 'SetMultiplier(uint256,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
