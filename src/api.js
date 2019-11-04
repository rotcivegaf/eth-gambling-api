const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const bytes32AllCaraters = '0x????????????????????????????????????????????????????????????????';

module.exports = async () => {
  const app = express();
  app.use(cors());
  app.listen(PORT, () => console.info(`Listening on ${ PORT }`));
  // Root
  app.get('/', async (req, res) => isSync(res));
  // Last process block
  app.get('/lastProcessBlock', (req, res) => getlastProcessBlock(req, res));
  // TIP ERC20
  app.get('/tip/:token', (req, res) => res.json(getKey(['tip', 'token', req.params.token])));
  // Currencies
  app.get('/currencies', (req, res) => getCurrencies(req, res));
  // Bets
  app.get('/bets', (req, res) => res.json(getKey(['bet', bytes32AllCaraters])));
  // GamblingManager ownership
  app.get('/gamblingManager/owner', (req, res) => res.json(getKey(['GamblingManager', 'owner'])));
  // CoinFlip ownership
  app.get('/coinFlip/owner', (req, res) => res.json(getKey(['CoinFlip', 'owner'])));
};

async function isSync(res) {
  const lastProcessBlock = await getKey('lastProcessBlock');
  const actualBlock = (await process.w3Utils.getBlock()).number;

  return res.json({
    'lastProcessBlock': lastProcessBlock,
    'actualBlock': actualBlock,
    'synchronized': (actualBlock - lastProcessBlock) <= 12,
  });
}

async function getlastProcessBlock(req, res) {
  return res.json({ 'lastProcessBlock': await getKey('lastProcessBlock') });
}

async function getCurrencies(req, res) {
  const jsonCurrencies = await process.redis.lrangeAsync('currencies', 0, -1);
  const currencies = jsonCurrencies.map(x => JSON.parse(x));

  return res.json(currencies);
}

async function getKey(key) {
  if (typeof key !== 'string')
    key.join(':');

  return process.redis.getAsync(key).then(response => {
    return response;
  }).catch(logE);
}

async function lrangeKey(key, from, to) {
  if (typeof key !== 'string')
    key.join(':');

  return process.redis.lrangeAsync(key, from, to).then(response => {
    return response;
  }).catch(logE);
}

function logE(error) {
  console.log(error);
}
