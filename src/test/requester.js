const rp = require('request-promise');

const env = require('../../environment.js');

const apiUrl = env['test'].apiUrl;

function bn(x) {
  return require('web3').utils.toBN(x);
}

async function consult (dir) {
  var options = {
    //method: 'POST',
    uri: apiUrl + dir,
    //body: {
    //  some: 'payload'
    //},
    json: true // Automatically stringifies the body to JSON
  };

  const resp = await rp(options);
  if (resp === null) throw new Error('The responce its null');
  console.log(resp);
  console.log(resp.toString());
  console.log(resp[0]);
  console.log(resp[1]);
  console.log(resp[2]);
  return resp;
}

module.exports.getLastProcessBlock = async () => {
  return bn(await consult('/lastProcessBlock'));
};

module.exports.getGamblingManager = async (data) => {
  return consult('/gamblingManager/' + data);
};
