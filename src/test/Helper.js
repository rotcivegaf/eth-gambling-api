const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const requester = require('./requester.js');

const W3Utils = require('../W3Utils.js');

const env = require('../../environment.js');

process.environment = env['test'];

process.w3Utils = new W3Utils();
const w3 = process.w3Utils.w3;
process.requester = requester;

module.exports.ETH = w3.utils.padLeft('0x0', 40);
module.exports.address0x = w3.utils.padLeft('0x0', 40);
module.exports.bytes320x = w3.utils.toTwosComplement('0x0');

module.exports.getPrivateKeys = async () => {
  const seed = await bip39.mnemonicToSeed(env.test.mnemonic);
  const hdk = hdkey.fromMasterSeed(seed);

  const privateKeys = [];
  for (let i = 0; i < 10; i++) { // Ganache starts with 10 accounts
    const addr_node = hdk.derivePath('m/44\'/60\'/0\'/0/' + i.toString());
    const privateKey = addr_node.getWallet().getPrivateKeyString();

    privateKeys.push(privateKey);
  }

  return privateKeys;
};

module.exports.instanceAccounts = (pks) => {
  if (!(pks && pks.length)) throw new Error('There are no private keys to instance the signers: ' + pks);

  const accounts = [];
  for (let i = 0; i < pks.length; i++) {
    const pk = pks[i];

    if(w3.utils.isHexStrict(pk)) {
      const account =  w3.eth.accounts.privateKeyToAccount(pk);
      w3.eth.accounts.wallet.add(account);
      accounts.push(account.address);
    } else {
      console.log('The private key its not valid: ' + pk);
    }
  }
  return accounts;
};

module.exports.deploy = async (Contract, data = { args: [] }) => {
  if (data.sender === undefined) data.sender = w3.eth.accounts.wallet[0].address;
  const contract = new w3.eth.Contract(Contract.abi);
  const deploy = contract.deploy({ data: Contract.bytecode, arguments: data.args });
  const gas = await deploy.estimateGas((err, _gas) => { return _gas; });

  return deploy.send({ from: data.sender, gas: gas });
};

module.exports.sendTxCheckEvent = async (Contract, methodName, eventName, sender, args = [], value = 0) => {
  const method = Contract.methods[methodName].apply(this, args);
  //const gasEstimate = await method.estimateGas({ from: sender });

  const tx = await method.send({ from: sender, gas: 4000000, value: value });

  if (!tx.events[eventName]) throw new Error('Error: The event dont find');

  const actualBlock = process.w3Utils.bn(tx.blockNumber);
  let lastProcessBlock = await requester.getAsBN('/lastProcessBlock');

  while(lastProcessBlock.lt(actualBlock)) {
    await process.w3Utils.sleep(2000);
    lastProcessBlock = await requester.getAsBN('/lastProcessBlock');
  }
  console.log('sync to block: ' + lastProcessBlock);
};
