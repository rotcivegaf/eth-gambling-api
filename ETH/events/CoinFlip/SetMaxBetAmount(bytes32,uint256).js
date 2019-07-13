const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports.signature = 'SetMaxBetAmount(bytes32,uint256)';
module.exports.hexSignature = '0x2f797d9e895271236f9486994ffcefb1e27e7a031d9ec1beda769d4c8ac269ea';

module.exports.process = async (log) => {
  //const event = utils.getEvent(CoinFlip, 'SetMaxBetAmount(bytes32,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
