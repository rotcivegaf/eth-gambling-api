const dBConnector = require('./dBConnector.js');

module.exports.process = async (logs) => {
  logs.forEach( async (log)  => {
    const contractName = 'CoinFlip/';
    const eventName = 'Lose';
    const event = require('../build/eventProcessor/' + contractName + eventName + '.js');
    await dBConnector.commit(await event(log));
  });
};
