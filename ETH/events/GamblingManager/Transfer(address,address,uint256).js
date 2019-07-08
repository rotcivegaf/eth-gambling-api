const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Transfer(address,address,uint256)';
module.exports.hexSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Transfer(address,address,uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
