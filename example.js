const Web3 = require('web3')

const rpcUrl = "https://ropsten.infura.io/v3/f6427a6723594cdd8affb596d357d268";
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

module.exports.getTx = async (seconds) => {
  console.log("aa");
}
/*
export async function subscribeLogEvent() {
  const subscription = await web3.eth.subscribe(
    'logs',
    {
      address: coinFlipAddress,
      topics: ['0xff1ff7e80e3a256a45b864dc9466ea84e6429b7f9f02cb754273d316fc6d4413']
    },
    function (error, result) {
      if (!error) {
        console.log(result);
      } else {
        console.log(error);
      }
    }
  );

  return subscription;
}

export async function getEvents() {
  const coinFlip = new web3.eth.Contract(CoinFlipABI, coinFlipAddress);

  const a = [];
  await coinFlip.events.allEvents(
    {
      fromBlock: 0,
      toBlock: 'latest'
    },
    function (error, result) {
      if (!error) {
        a.push(result);
      } else {
        console.log(error);
      }
    }
  );
  console.log(a);

  const gamblingManager = new web3.eth.Contract(GamblingManagerABI, gamblingManagerAddress);

  const b = [];
  await gamblingManager.events.allEvents(
    {
      fromBlock: 0,
      toBlock: 'latest'
    },
    function (error, result) {
      if (!error) {
        b.push(result);
      } else {
        console.log(error);
      }
    }
  );
  console.log(b);
}
*/
