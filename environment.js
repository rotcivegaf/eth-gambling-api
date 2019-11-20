const W3 = require('web3');

const GamblingManager = require('./src/ETH/build/contracts/GamblingManager.json');
const CoinFlip = require('./src/ETH/build/contracts/CoinFlip.json');

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
];

const contractsAddressesRopsten = [];
contractsAddressesRopsten['GamblingManager'] = '0x734914c77665f59A1e307E9F537d8d26e3dD0CE8';
contractsAddressesRopsten['CoinFlip'] = '0x3e8efe70fdacf4b1e90b388007c3765c6ed4f843';

const contractsAddressesTest = [];
contractsAddressesTest['GamblingManager'] = '0x3C07FaA16fB56381eD3d1c704061746Bbd115Dd3';
contractsAddressesTest['CoinFlip'] = '0xb3597376DDb2cFF1D54F61b7b0A9Fc3729c1a2dB';

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
  }/*,
  test: {
    contracts: addAddresses(contractsAddressesTest),
    redisUrl: '//redis:6379',
    nodeEth: 'http://ganachecli:8545',
    apiUrl: 'http://processor:5000',
    mnemonic: '0',
    interval: 1,
    startBlock: 0,
    wait: 5000,
  }*/
};

function addAddresses(addresses) {
  for (let i = 0; i < contracts.length; i++) {
    addresses[contracts[i].name] = W3.utils.toChecksumAddress(addresses[contracts[i].name]);
    contracts[i].address = addresses[contracts[i].name];
  }

  return contracts;
}
