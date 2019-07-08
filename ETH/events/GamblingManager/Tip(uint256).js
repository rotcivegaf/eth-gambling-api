const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'Tip(uint256)';
module.exports.hexSignature = '0x97362cd7557f1e4015ecf84de2e87a4dddce35d4916bea6b059d7b9e9ca99a56';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'Tip(uint256)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
