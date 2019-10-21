const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const bytes32AllCaraters = '??????????????????????????????????????????????????????????????????';

module.exports = async (w3Utils, redis) => {
  const app = express();
  app.use(cors());
  app.listen(PORT, () => console.info(`Listening on ${ PORT }`));
  // Root
  app.get('/', async (req, res) => {
    const key = 'lastProcessBlock';
    const lastBlock = w3Utils.bn(await w3Utils.getBlock());

    let lastProcessBlock;
    redis.getAsync(key).then(response => {
      lastProcessBlock = w3Utils.bn(res.json(response));
    }).catch(logE);

    return (lastProcessBlock - lastBlock) <= w3Utils.bn(12);
  });
  // Last process block
  app.get('/lastProcessBlock', (req, res) => {
    const key = 'lastProcessBlock';
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
  // TIP ERC20
  app.get('/tip/:token', (req, res) => {
    const key = ['tip', 'token', req.params.token].join(':');
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
  // Currencies
  app.get('/currencies', (req, res) => {
    const key = ['user', '*', 'balance'].join(':');
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
  // Bets
  app.get('/bets', (req, res) => {
    const key = ['bet', bytes32AllCaraters].join(':');
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
  // GamblingManager ownership
  app.get('/gamblingManager/owner', (req, res) => {
    const key = ['GamblingManager', 'owner'].join(':');
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
  // CoinFlip ownership
  app.get('/coinFlip/owner', (req, res) => {
    const key = ['CoinFlip', 'owner'].join(':');
    redis.getAsync(key).then(response => {
      return res.json(response);
    }).catch(logE);
  });
};

function logE(error) {
  console.log(error);
}
