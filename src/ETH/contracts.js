const GamblingManager = require('./build/contracts/GamblingManager.json');
const CoinFlip = require('./build/contracts/CoinFlip.json');

module.exports.data = [
  {
    name: GamblingManager.contractName,
    abi: GamblingManager.abi
  },
  {
    name: CoinFlip.contractName,
    abi: CoinFlip.abi
  },
];

//module.exports.addresses = this.data.map(c => c.address);
module.exports.abis = this.data.map(c => c.abi);
module.exports.getName = (address) => {
  return this.data.find(c => c.address === address).name;
};
