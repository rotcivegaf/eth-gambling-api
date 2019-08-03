const nodes = {
  infura: {
    ropsten: 'https://ropsten.infura.io/v3/f6427a6723594cdd8affb596d357d268',
    mainnet: 'https://mainnet.infura.io/v3/f6427a6723594cdd8affb596d357d268',
  },
  rcn: {
    ropsten: 'http://ropsten.node.rcn.loans:8545',
    mainnet: 'http://main.node.rcn.loans:8545',
  },
  local: 'http://localhost:8545',
};

module.exports = {
  node: nodes.infura.ropsten,
  interval: 5000,
  startBlock: 6115381,
  wait: 29000
};
