const CoinFlip = require('../../build/contracts/CoinFlip.json');

module.exports.signature = 'Deposit()';
module.exports.hexSignature = '0xed21248cb703b524cc0029bb8669df941baca560163a3bc6ad184e7e9c268070';

module.exports.process = async (log) => {
  //const event = utils.getEvent(CoinFlip, 'Deposit()', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
