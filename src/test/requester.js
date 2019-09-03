const rp = require('request-promise');

const env = require('../../environment.js');

const apiUrl = env['test'].apiUrl;

function bn(x) {
  return require('web3').utils.toBN(x);
}

async function consult (dir) {
  const resp = await rp({ uri: apiUrl + dir, json: true });
  if (resp === null) throw new Error('The responce its null');
  return resp;
}

module.exports.get = async (uri) => {
  return consult(uri);
};

module.exports.getAsBN = async (uri) => {
  return bn(await this.get(uri));
};

module.exports.getAsObj = async (uri) => {
  console.log(await this.get(uri));
  console.log((await this.get(uri)).toString());
  return JSON.parse((await this.get(uri)).toString());
};
