const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'SetURIProvider(address)';
module.exports.hexSignature = '0x8830bfff0a198778822a37d97bfba3d9d6e08bcd080eb82f2a76f2060a7494ec';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'SetURIProvider(address)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
