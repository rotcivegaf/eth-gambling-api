const Helper = require('./Helper.js');

const TestERC20 = require('../ETH/build/contracts/test/TestERC20.json');
const GamblingManager = require('../ETH/build/contracts/GamblingManager.json');
const CoinFlip = require('../ETH/build/contracts/CoinFlip.json');

const w3 = process.web3;

function bn (number) {
  return web3.utils.toBN(number);
}

function toHexBytes32 (number) {
  return web3.utils.toTwosComplement(number);
}

async function main() {
  const pks = await Helper.getPrivateKeys();
  const accounts = Helper.instanceAccounts(pks);
  const testToken = await Helper.deploy(TestERC20);
  const gamblingManager = await Helper.deploy(GamblingManager);
  const coinFlip = await Helper.deploy(CoinFlip, { args: [gamblingManager._address] });



  const firstOwner = accounts[0];
  const owner = accounts[1];
  // const creator = accounts[2];
  //const player1 = accounts[3];
  // const player2 = accounts[4];
  //const depositer = accounts[6];
  //const tipper = accounts[7];

  // Contract Ownable
  // event OwnershipTransferred(address,address)
  await Helper.sendTxCheckEvent(gamblingManager, 'transferOwnership', 'OwnershipTransferred', firstOwner, [owner]);
  //console.log(tx);



  //await Helper.sendTxCheckEvent(gamblingManager, 'tip', 'Tip', firstOwner, [owner, Helper.ETH, 1], 1);
}

main();
/*
contract('GamblingManager', function (accounts) {

  /*describe('Contract TipERC20', function () {
    it('event Tip(address,address,uint256), with ETH', async () => {
      await Helper.toEvents(
        gamblingManager.tip(tipper, ETH, 100, { from: tipper }),
        'Tip'
      );
    });
    it('event Tip(address,address,uint256), with ERC20', async () => {
      await erc20.setBalance(tipper, 100, { from: owner });

      await Helper.toEvents(
        gamblingManager.tip(tipper, erc20.address, 100, { from: tipper }),
        'Tip'
      );
    });
  });
/*  describe('Contract BalanceManager', function () {
    it('event Approval(address,address,address,uint256), with ETH', async () => {
      await Helper.toEvents(
        gamblingManager.approve(player1, ETH, bn('99999999999999999999999999999999'), { from: depositer }),
        'Approval'
      );
    });
    it('event Approval(address,address,address,uint256), with ERC20', async () => {
      await Helper.toEvents(
        gamblingManager.approve(player1, erc20.address, bn('99999999999999999999999999999999'), { from: depositer }),
        'Approval'
      );
    });
    /*
    // event Deposit(address indexed _from, address indexed _to, address _token, uint256 _value);
    await gamblingManager.deposit(player1, ETH, 10000, { from: depositer, value: 10000 });
    // TODO get ERC20 tokens
    await gamblingManager.deposit(player1, erc20.address, 10000, { from: depositer });
    // event Transfer(address indexed _from, address indexed _to, address _token, uint256 _value);
    await gamblingManager.deposit(player2, ETH, 10000, { from: player1 });
    // event Withdraw(address indexed _from, address indexed _to, address _token, uint256 _value);
    */
  //  });
  /*describe('Contract ERC721Base', function () {
    it('event SetURIProvider(URIProvider _uriProvider);', async () => {
      await gamblingManager.setURIProvider(address0x, { from: owner });
      await gamblingManager.setURIProvider(gamblingManager.address, { from: owner });
    });
    it('event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);', async () => {
    });
    it('event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);', async () => {
    });
    it('event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);', async () => {
    });
  });
  describe('Contract GamblingManager', function () {
    it('event Created(address indexed _sender, bytes32 indexed _id, address _token, bytes _data, uint256 _nonce);', async () => {
    });
    it('event Created2(address indexed _sender, bytes32 indexed _id, address _token, bytes _data, uint256 _salt);', async () => {
    });
    it('event Created3(address indexed _sender, bytes32 indexed _id, address _token, bytes _data, uint256 _salt);', async () => {
    });
    it('event Played(address indexed _sender, address indexed _player, bytes32 indexed _id, uint256 _amount, bytes _data);', async () => {
    });
    it('event Collected(address indexed _sender, bytes32 indexed _id, address indexed _beneficiary, uint256 _amount, bytes _data);', async () => {
    });
    it('event Canceled(address indexed _sender, bytes32 indexed _id, uint256 _amount, bytes _data);', async () => {
    });
    it('event ModelTransfer(bytes32 indexed _id, address indexed _beneficiary, uint256 _amount);', async () => {
    });
  });*/
//});
