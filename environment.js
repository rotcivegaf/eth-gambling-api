const W3 = require('web3');

const GamblingManager = require('./src/ETH/build/contracts/GamblingManager.json');
const CoinFlip = require('./src/ETH/build/contracts/CoinFlip.json');
const P2P = require('./src/ETH/build/contracts/P2P.json');

const nodes = {
  infura: {
    ropsten: 'https://ropsten.infura.io/v3/f6427a6723594cdd8affb596d357d268',
    mainnet: 'https://mainnet.infura.io/v3/f6427a6723594cdd8affb596d357d268',
  },
  rcn: {
    ropsten: 'http://ropsten.node.rcn.loans:8545',
    mainnet: 'http://main.node.rcn.loans:8545',
  }
};

const contracts = [
  {
    name: GamblingManager.contractName,
    abi: GamblingManager.abi
  },
  {
    name: CoinFlip.contractName,
    abi: CoinFlip.abi
  },
  {
    name: P2P.contractName,
    abi: P2P.abi
  },
];

const contractsAddressesRopsten = [];
contractsAddressesRopsten['GamblingManager'] = '0xf4c0b61a4b8e8D2900a56e8CbdD144D73EB59a26';
contractsAddressesRopsten['CoinFlip'] = '0x3e8efe70fdacf4b1e90b388007c3765c6ed4f843';
contractsAddressesRopsten['P2P'] = '0xe74a122AE31BeA07B98a6E4D127cc357291EAcB4';

module.exports = {
  main: {
    contracts: addAddresses('???'),
    redisUrl: process.env.REDISCLOUD_URL,
    nodeEth: nodes.infura.mainnet,
    interval: 5000,
    startBlock: '???',
    wait: 29000
  },
  ropsten: {
    contracts: addAddresses(contractsAddressesRopsten),
    redisUrl: process.env.REDISCLOUD_URL,// '//localhost:6379',
    nodeEth: nodes.infura.ropsten,
    interval: 10000,
    startBlock: 6813784,
    wait: 29000
  }
};

function addAddresses(addresses) {
  for (let i = 0; i < contracts.length; i++) {
    addresses[contracts[i].name] = W3.utils.toChecksumAddress(addresses[contracts[i].name]);
    contracts[i].address = addresses[contracts[i].name];
  }

  return contracts;
}
