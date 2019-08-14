const GamblingManager = require('./build/contracts/GamblingManager.json');
const CoinFlip = require('./build/contracts/CoinFlip.json');

module.exports.data = [
  {
    name: 'GamblingManager',
    address: '0x2c9228335861B110D96959936cdb5F23526143D7',
    abi: GamblingManager.abi
  },
  {
    name: 'CoinFlip',
    address: '0x9C8Ac8eF8bdB21f212CFE8CAdfbe5442DCD336Ec',
    abi: CoinFlip.abi
  },
];

module.exports.addresses = this.data.map(c => c.address);
module.exports.abis = this.data.map(c => c.abi);
module.exports.getName = (address) => {
  return this.data.find(c => c.address === address).name;
};
