const CoinFlip = require('../../contracts/CoinFlip.json');

module.exports.signature = 'Lose(uint256,uint256,uint256,uint256)';
module.exports.hexSignature = '0xff1ff7e80e3a256a45b864dc9466ea84e6429b7f9f02cb754273d316fc6d4413';

module.exports.process = async (log) => {
  //const event = utils.getEvent(CoinFlip, 'Lose(uint256,uint256,uint256,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
