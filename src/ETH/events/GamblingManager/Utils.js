module.exports.addBet = async (event, betObj) => {
  betObj = {
    sender: event._sender,
    token: event._token,
    model: event._model,
    data: event._data,
  };

  const key = ['bet', event._id].join(':');

  await process.redis.setAsync(key, JSON.stringify(betObj));

  // Add currency
  await this.addCurrency(event._token);
};

module.exports.addCurrency = async (tokenAddress) => {
  const jsonCurrencies = await process.redis.lrangeAsync('currencies', 0, -1);
  const currencies = jsonCurrencies.map(x => JSON.parse(x));
  const currencyExists = currencies.some(x => x.address === tokenAddress);

  if (!currencyExists) {
    process.contracts.erc20._address = tokenAddress;

    const currency = {
      address: tokenAddress,
      name: await process.contracts.erc20.methods.name().call(),
      symbol: await process.contracts.erc20.methods.symbol().call(),
      iconUrl: '???',
    };

    await process.redis.rpushAsync('currencies', JSON.stringify(currency));
  }
};
