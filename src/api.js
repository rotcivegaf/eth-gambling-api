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
  app.get('/tip/:token', async (req, res) => res.json(await getValue(['tip', 'token', req.params.token])));
  // Currencies
  app.get('/currencies', (req, res) => getCurrencies(req, res));
  // Bets
  app.get('/bets', async (req, res) => res.json(await getValues(['bet', bytes32AllCaraters])));
  // GamblingManager ownership
  app.get('/gamblingManager/owner', async (req, res) => res.json(await getValue(['GamblingManager', 'owner'])));
  // CoinFlip ownership
  app.get('/coinFlip/owner', async (req, res) => res.json(await getValue(['CoinFlip', 'owner'])));
};

async function isSync(res) {
  const lastProcessBlock = await getValue('lastProcessBlock');
  const actualBlock = (await process.w3Utils.getBlock()).number;

  return res.json({
    'lastProcessBlock': lastProcessBlock,
    'actualBlock': actualBlock,
    'synchronized': (actualBlock - lastProcessBlock) <= 12,
  });
}

async function getlastProcessBlock(req, res) {
  return res.json({ 'lastProcessBlock': await getValue('lastProcessBlock') });
}

async function getCurrencies(req, res) {
  const jsonCurrencies = await process.redis.lrangeAsync('currencies', 0, -1);
  const currencies = jsonCurrencies.map(x => JSON.parse(x));

  return res.json(currencies);
}

async function getValues(key) {
  if (typeof key !== 'string')
    key = key.join(':');

  const keys = await process.redis.getKeysAsync(key);

  if (keys.length === 0)
    return 'There is no keys with pattern' + key;

  return process.redis.mgetAsync(keys).then(response => {
    return response.map((bet, i) => {
      bet = JSON.parse(bet);
      bet.id = keys[i].slice(4);
      return bet;
    });
  }).catch(logE);
}

async function getValue(key) {
  if (typeof key !== 'string')
    key = key.join(':');

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
