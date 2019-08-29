const express = require('express');

const PORT = process.env.PORT || 5000;

module.exports = async (redis) => {
  const app = express();
  app.listen(PORT, () => console.info(`Listening on ${ PORT }`));
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
