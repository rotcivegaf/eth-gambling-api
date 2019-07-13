const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports.signature = 'Win(uint256,uint256,uint256,uint256)';
module.exports.hexSignature = '0xa8e5116b10f6bc252038b8927939c96eedbd5b9b3103c44c83bffd92996c41f9';

module.exports.process = async (log) => {
  //const event = utils.getEvent(CoinFlip, 'Win(uint256,uint256,uint256,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
