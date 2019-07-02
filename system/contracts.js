const GamblingManager = require('../build/contracts/GamblingManager.json');
const CoinFlip = require('../build/contracts/CoinFlip.json');

const contracts = [
  {
    name: 'gamblingManager',
    address: '0x1654F07d008ba7b3683C575BDBC97C90d3c1AA6f',
    ABI: GamblingManager.abi
  },
  {
    name: 'coinFlip',
    address: '0xA6ff317b10b07360c56fA5B2B42F91C7B6b77E64',
    ABI: CoinFlip.abi
  },
];

module.exports.addresses = contracts.map(c => c.address);
module.exports.ABIs = contracts.map(c => c.ABI);
