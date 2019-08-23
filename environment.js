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
contractsAddressesRopsten['GamblingManager'] = '0x2c9228335861B110D96959936cdb5F23526143D7';
contractsAddressesRopsten['CoinFlip'] = '0x9C8Ac8eF8bdB21f212CFE8CAdfbe5442DCD336Ec';

const contractsAddressesTest = [];
contractsAddressesTest['GamblingManager'] = '0x3C07FaA16fB56381eD3d1c704061746Bbd115Dd3';
contractsAddressesTest['CoinFlip'] = '0xb3597376DDb2cFF1D54F61b7b0A9Fc3729c1a2dB';

module.exports = {
  main: {
    contracts: addAddresses('???'),
    redisUrl: process.env.REDISCLOUD_URL,
    node: nodes.infura.mainnet,
    interval: 5000,
    startBlock: '???',
    wait: 29000
  },
  ropsten: {
    contracts: addAddresses(contractsAddressesRopsten),
    redisUrl: process.env.REDISCLOUD_URL,
    node: nodes.infura.ropsten,
    interval: 5000,
    startBlock: 6115511,
    wait: 5000
  },
  test: {
    contracts: addAddresses(contractsAddressesTest),
    redisUrl: '//redis:6379',
    node: 'http://ganachecli:8545',
    mnemonic: '0',
    interval: 50,
    startBlock: 0,
    wait: 5000,
  }
};

function addAddresses(addresses){
  for (let i = 0; i < contracts.length; i++)
    contracts[i].address = addresses[contracts[i].name];
  return contracts;
}
