module.exports.addBet = async (event, betObj) => {
  betObj = {
    sender: event._sender,
    token: event._token,
    data: event._data,
  };

  const key = ['bet', event._id].join(':');

  await process.redis.setAsync(key, JSON.stringify(betObj));

  // Add currency
  const jsonCurrencies = await process.redis.lrangeAsync('currencies', 0, -1);
  const currencies = jsonCurrencies.map(x => JSON.parse(x));
  const currencyExists = currencies.some(x => x.address === event._token);
  if (!currencyExists) {
    process.contracts.erc20._address = event._token;

    const currency = {
      address: event._token,
      name: await process.contracts.erc20.methods.name().call(),
      symbol: await process.contracts.erc20.methods.symbol().call(),
      iconUrl: '???',
    };

    await process.redis.rpushAsync('currencies', JSON.stringify(currency));
  }
};
