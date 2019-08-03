const GamblingManager = require('./build/contracts/GamblingManager.json');
const CoinFlip = require('./build/contracts/CoinFlip.json');

module.exports.data = [
  {
    name: 'GamblingManager',
    address: '0x6373CDf57Bb87Ce77D02a437108456B458B98F03',
    abi: GamblingManager.abi
  },
  {
    name: 'CoinFlip',
    address: '0xed709204B5d362eC21460878E9d191fB6746DfD2',
    abi: CoinFlip.abi
  },
];

module.exports.addresses = this.data.map(c => c.address);
module.exports.abis = this.data.map(c => c.abi);
module.exports.getName = (address) => {
  return this.data.find(c => c.address === address).name;
};
