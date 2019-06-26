const contracts = [
  {
    name: 'gamblingManager',
    address: '0x1654F07d008ba7b3683C575BDBC97C90d3c1AA6f',
    ABI: [
      {
        'constant': true,
        'inputs': [
          {
            'name': 'interfaceId',
            'type': 'bytes4'
          }
        ],
        'name': 'supportsInterface',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'name',
        'outputs': [
          {
            'name': '',
            'type': 'string'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_erc721Id',
            'type': 'uint256'
          }
        ],
        'name': 'getApproved',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_operator',
            'type': 'address'
          },
          {
            'name': '_assetId',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'withdrawAll',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [
          {
            'name': 'success',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_assetId',
            'type': 'uint256'
          }
        ],
        'name': 'transferFrom',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'withdrawFrom',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_operator',
            'type': 'address'
          },
          {
            'name': '_assetId',
            'type': 'uint256'
          }
        ],
        'name': 'isAuthorized',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          }
        ],
        'name': 'assetsOf',
        'outputs': [
          {
            'name': '',
            'type': 'uint256[]'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_betId',
            'type': 'bytes32'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'cancel',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_erc20',
            'type': 'address'
          },
          {
            'name': '_model',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          },
          {
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'create2',
        'outputs': [
          {
            'name': 'betId',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_assetId',
            'type': 'uint256'
          }
        ],
        'name': 'safeTransferFrom',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_creator',
            'type': 'address'
          },
          {
            'name': '_nonce',
            'type': 'uint256'
          }
        ],
        'name': 'buildId',
        'outputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_index',
            'type': 'uint256'
          }
        ],
        'name': 'erc721ByIndex',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'allAssetsOf',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_erc721Id',
            'type': 'uint256'
          }
        ],
        'name': 'ownerOf',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_erc20',
            'type': 'address'
          },
          {
            'name': '_model',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          },
          {
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'create3',
        'outputs': [
          {
            'name': 'betId',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_beneficiary',
            'type': 'address'
          },
          {
            'name': '_betId',
            'type': 'bytes32'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'collect',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'name': 'nonces',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'ETH',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'deposit',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'indexOfAsset',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'allErc721Ids',
        'outputs': [
          {
            'name': '',
            'type': 'uint256[]'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'owner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'erc721Ids',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          },
          {
            'name': '_spender',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'allowance',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          },
          {
            'name': '_index',
            'type': 'uint256'
          }
        ],
        'name': 'erc721OfOwnerByIndex',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'symbol',
        'outputs': [
          {
            'name': '',
            'type': 'string'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_beneficiary',
            'type': 'address'
          },
          {
            'name': '_betId',
            'type': 'bytes32'
          },
          {
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'modelTransfer',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          }
        ],
        'name': 'transferTo',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_operator',
            'type': 'address'
          },
          {
            'name': '_authorized',
            'type': 'bool'
          }
        ],
        'name': 'setApprovalForAll',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_assetId',
            'type': 'uint256'
          },
          {
            'name': '_userData',
            'type': 'bytes'
          }
        ],
        'name': 'safeTransferFrom',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_creator',
            'type': 'address'
          },
          {
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'buildId3',
        'outputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_erc20',
            'type': 'address'
          },
          {
            'name': '_model',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'create',
        'outputs': [
          {
            'name': 'betId',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'transfer',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_creator',
            'type': 'address'
          },
          {
            'name': '_erc20',
            'type': 'address'
          },
          {
            'name': '_model',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          },
          {
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'buildId2',
        'outputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_erc721Id',
            'type': 'uint256'
          }
        ],
        'name': 'tokenURI',
        'outputs': [
          {
            'name': '',
            'type': 'string'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_player',
            'type': 'address'
          },
          {
            'name': '_betId',
            'type': 'bytes32'
          },
          {
            'name': '_maxAmount',
            'type': 'uint256'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'play',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'tip',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'withdraw',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_spender',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'name': 'success',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'totalSupply',
        'outputs': [
          {
            'name': 'internalSupply',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_operator',
            'type': 'address'
          },
          {
            'name': '_owner',
            'type': 'address'
          }
        ],
        'name': 'isApprovedForAll',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'name': 'toBet',
        'outputs': [
          {
            'name': 'erc20',
            'type': 'address'
          },
          {
            'name': 'balance',
            'type': 'uint256'
          },
          {
            'name': 'model',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_from',
            'type': 'address'
          },
          {
            'name': '_to',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          },
          {
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'depositFrom',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_owner',
            'type': 'address'
          },
          {
            'name': '_token',
            'type': 'address'
          }
        ],
        'name': 'balanceOf',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
      },
      {
        'payable': true,
        'stateMutability': 'payable',
        'type': 'fallback'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_uriProvider',
            'type': 'address'
          }
        ],
        'name': 'SetURIProvider',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_from',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_to',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_tokenId',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_approved',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_tokenId',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_operator',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_approved',
            'type': 'bool'
          }
        ],
        'name': 'ApprovalForAll',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_creator',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          },
          {
            'indexed': false,
            'name': '_nonce',
            'type': 'uint256'
          }
        ],
        'name': 'Created',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_creator',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          },
          {
            'indexed': false,
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'Created2',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_creator',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          },
          {
            'indexed': false,
            'name': '_salt',
            'type': 'uint256'
          }
        ],
        'name': 'Created3',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_sender',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_player',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_amount',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'Played',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_collecter',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': true,
            'name': '_beneficiary',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_amount',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'Collected',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_creator',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_amount',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'Canceled',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': true,
            'name': '_beneficiary',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'ModelTransfer',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_amount',
            'type': 'uint256'
          }
        ],
        'name': 'Tip',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_from',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_to',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'Transfer',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_owner',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_spender',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'Approval',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_from',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_to',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'Deposit',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': true,
            'name': '_from',
            'type': 'address'
          },
          {
            'indexed': true,
            'name': '_to',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_token',
            'type': 'address'
          },
          {
            'indexed': false,
            'name': '_value',
            'type': 'uint256'
          }
        ],
        'name': 'Withdraw',
        'type': 'event'
      }
    ],
  },
  {
    name: 'coinFlip',
    address: '0xA6ff317b10b07360c56fA5B2B42F91C7B6b77E64',
    ABI: [
      {
        'constant': false,
        'inputs': [
          {
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'name': '_maxBetAmount',
            'type': 'uint256'
          }
        ],
        'name': 'setMaxBetAmount',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'name': 'getNoMoreBets',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_possibility',
            'type': 'uint256'
          },
          {
            'name': '_multiplier',
            'type': 'uint256'
          }
        ],
        'name': 'setMultiplier',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'bytes'
          }
        ],
        'name': 'create',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_sender',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'collect',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'simNeedAmount',
        'outputs': [
          {
            'name': 'needAmount',
            'type': 'uint256'
          },
          {
            'name': 'canChange',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '_sender',
            'type': 'address'
          },
          {
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'name': '_player',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'validatePlay',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_sender',
            'type': 'address'
          },
          {
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'name': '_player',
            'type': 'address'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'play',
        'outputs': [
          {
            'name': 'needAmount',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'bytes'
          }
        ],
        'name': 'validateCreate',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'name': 'toMaxBetAmount',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'gamblingManager',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'owner',
        'outputs': [
          {
            'name': '',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'name': 'possibilitiesToMultiplier',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_to',
            'type': 'address'
          }
        ],
        'name': 'transferTo',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          }
        ],
        'name': 'getEnd',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': '_sender',
            'type': 'address'
          },
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '',
            'type': 'bytes'
          }
        ],
        'name': 'cancel',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': '',
            'type': 'bytes32'
          },
          {
            'name': '_data',
            'type': 'bytes'
          }
        ],
        'name': 'simActualReturn',
        'outputs': [
          {
            'name': 'needAmount',
            'type': 'uint256'
          },
          {
            'name': 'canChange',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'MULTIPLIER_BASE',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      },
      {
        'inputs': [
          {
            'name': '_gamblingManager',
            'type': 'address'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_id',
            'type': 'bytes32'
          },
          {
            'indexed': false,
            'name': '_maxBetAmount',
            'type': 'uint256'
          }
        ],
        'name': 'SetMaxBetAmount',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_possibility',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_multiplier',
            'type': 'uint256'
          }
        ],
        'name': 'SetMultiplier',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [],
        'name': 'Deposit',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_possibility',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_multiplier',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_luckyNumber',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_betNumber',
            'type': 'uint256'
          }
        ],
        'name': 'Win',
        'type': 'event'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': '_possibility',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_multiplier',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_luckyNumber',
            'type': 'uint256'
          },
          {
            'indexed': false,
            'name': '_betNumber',
            'type': 'uint256'
          }
        ],
        'name': 'Lose',
        'type': 'event'
      }
    ],
  },
];

module.exports.addresses = contracts.map(c => c.address);
module.exports.ABIs = contracts.map(c => c.ABI);
