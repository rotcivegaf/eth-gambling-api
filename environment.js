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

module.exports = {
  contractsAddresses: [
    {
      key: 'GamblingManager',
      value: '0x2c9228335861B110D96959936cdb5F23526143D7'
    },
    {
      key: 'CoinFlip',
      value: '0x9C8Ac8eF8bdB21f212CFE8CAdfbe5442DCD336Ec'
    }
  ],
  main: {
    redisUrl: process.env.REDISCLOUD_URL,
    node: nodes.infura.mainnet,
    interval: 5000,
    startBlock: '???',
    wait: 29000
  },
  ropsten: {
    redisUrl: process.env.REDISCLOUD_URL,
    node: nodes.infura.ropsten,
    interval: 5000,
    startBlock: 6115511,
    wait: 29000
  },
  test: {
    redisUrl: '//redis:6379',
    node: 'http://ganachecli:8545',
    mnemonic: '0',
    interval: 50,
    startBlock: 0,
    wait: 5000,
  }
};
