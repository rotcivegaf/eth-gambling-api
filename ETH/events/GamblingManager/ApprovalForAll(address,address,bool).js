const GamblingManager = require('../../contracts/GamblingManager.json');

module.exports.signature = 'ApprovalForAll(address,address,bool)';
module.exports.hexSignature = '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31';

module.exports.process = async (log) => {
  //const event = utils.getEvent(GamblingManager, 'ApprovalForAll(address,address,bool)', log);

  return await commit(log);
};

async function commit(log) {
  return [log];
}
