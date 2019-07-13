const GamblingManager = require('./build/contracts/GamblingManager.json');
const CoinFlip = require('./build/contracts/CoinFlip.json');

module.exports.data = [
  {
    name: 'GamblingManager',
    address: '0x1654F07d008ba7b3683C575BDBC97C90d3c1AA6f',
    abi: GamblingManager.abi
  },
  {
    name: 'CoinFlip',
    address: '0xA6ff317b10b07360c56fA5B2B42F91C7B6b77E64',
    abi: CoinFlip.abi
  },
];

module.exports.addresses = this.data.map(c => c.address);
module.exports.abis = this.data.map(c => c.abi);
module.exports.getName = (address) => {
  return this.data.find(c => c.address === address).name;
};
