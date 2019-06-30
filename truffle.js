module.exports = {
  compilers: {
    solc: {
      version: '0.5.6',
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: 'constantinople',
      },
    },
  },
};
