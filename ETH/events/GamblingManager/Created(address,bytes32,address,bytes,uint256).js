// event Created(address indexed _creator, bytes32 indexed _id, address _token, bytes _data, uint256 _nonce);
const GamblingManager = require('../../build/contracts/GamblingManager.json');

module.exports.signature = 'Created(address,bytes32,address,bytes,uint256)';
module.exports.hexSignature = '0xc4317439075cf670016d9fff15c98babe21304c2c393e72a80d34d993779e70a';

module.exports.process = async (log) => {
  const key = 'bet:' + log.topics[2];
  const bet = {
  	creator: log.topics[1]
  	token: log.data.slice(0, 66)
  };

  return { key: key, dataObject: bet };
}