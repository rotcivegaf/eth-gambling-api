
// File: contracts/interfaces/IModel.sol

pragma solidity ^0.5.6;


interface IModel {
    // This methods should be sender by the GamblingManager
    function create(address _sender, bytes32 _betId, bytes calldata _data) external returns(bool success);
    function play(address _sender, bytes32 _betId, address _player, bytes calldata _data) external returns(uint256 needAmount);
    function collect(address _sender, bytes32 _betId, address _player, bytes calldata _data) external returns(uint256 amount);
    function cancel(address _sender, bytes32 _betId, bytes calldata _data) external returns(bool success);

    function validateCreate(address _sender, bytes32 _betId, bytes calldata _data) external view returns(bool);
    function validatePlay(address _sender, bytes32 _betId, address _player, bytes calldata _data) external view returns(bool);

    function getEnd(bytes32 _betId) external view returns (uint256 endTime);
    function getNoMoreBets(bytes32 _betId) external view returns (uint256 noMoreBets);

    function simNeedAmount(bytes32 _betId, bytes calldata _data) external view returns (uint256 needAmount, bool canChange);
    function simActualReturn(bytes32 _betId, bytes calldata _data) external view returns (uint256 returnAmount, bool canChange);
}

// File: contracts/interfaces/ITipERC20.sol

pragma solidity ^0.5.0;


interface ITipERC20 {
    event Tip(address indexed _from, address indexed _token, uint256 _amount);

    function tip(address _from, address _token, uint256 _amount) external payable;
}

// File: contracts/interfaces/IGamblingManager.sol

pragma solidity ^0.5.6;


interface IGamblingManager {
    event Created(
        address indexed _creator,
        bytes32 indexed _id,
        address _token,
        bytes _data,
        uint256 _nonce
    );

    event Created2(
        address indexed _creator,
        bytes32 indexed _id,
        address _token,
        bytes _data,
        uint256 _salt
    );

    event Created3(
        address indexed _creator,
        bytes32 indexed _id,
        address _token,
        bytes _data,
        uint256 _salt
    );

    event Played(
        address indexed _sender,
        address indexed _player,
        bytes32 indexed _id,
        uint256 _amount,
        bytes _data
    );

    event Collected(
        address indexed _collecter,
        bytes32 indexed _id,
        address indexed _beneficiary,
        uint256 _amount,
        bytes _data
    );

    event Canceled(
        address indexed _creator,
        bytes32 indexed _id,
        uint256 _amount,
        bytes _data
    );

    event ModelTransfer(
        bytes32 indexed _id,
        address indexed _beneficiary,
        uint256 _amount
    );
}

// File: contracts/interfaces/IERC721.sol

pragma solidity ^0.5.6;


interface IERC721 {
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function approve(address _approved, uint256 _tokenId) external;
    function setApprovalForAll(address _operator, bool _approved) external;
}

// File: contracts/interfaces/IERC165.sol

pragma solidity ^0.5.6;


interface IERC165 {
    /// @notice Query if a contract implements an interface
    /// @param interfaceID The interface identifier, as specified in ERC-165
    /// @dev Interface identification is specified in ERC-165. This function
    ///  uses less than 30,000 gas.
    /// @return `true` if the contract implements `interfaceID` and
    ///  `interfaceID` is not 0xffffffff, `false` otherwise
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

// File: contracts/utils/ERC165.sol

pragma solidity ^0.5.6;



/**
 * @title ERC165
 * @author Matt Condon (@shrugs)
 * @dev Implements ERC165 using a lookup table.
 */
contract ERC165 is IERC165 {
    bytes4 private constant _InterfaceId_ERC165 = 0x01ffc9a7;
    /**
    * 0x01ffc9a7 ===
    *   bytes4(keccak256('supportsInterface(bytes4)'))
    */

    /**
    * @dev a mapping of interface id to whether or not it's supported
    */
    mapping(bytes4 => bool) private _supportedInterfaces;

    /**
    * @dev A contract implementing SupportsInterfaceWithLookup
    * implement ERC165 itself
    */
    constructor() internal {
        _registerInterface(_InterfaceId_ERC165);
    }

    /**
    * @dev implement supportsInterface(bytes4) using a lookup table
    */
    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /**
    * @dev internal method for registering an interface
    */
    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff, "Can't register 0xffffffff");
        _supportedInterfaces[interfaceId] = true;
    }
}

// File: contracts/utils/IsContract.sol

pragma solidity ^0.5.6;


library IsContract {
    function isContract(address _addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(_addr) }
        return size > 0;
    }
}

// File: contracts/utils/ERC721Base.sol

pragma solidity ^0.5.6;





interface URIProvider {
    function tokenURI(uint256 _erc721Id) external view returns (string memory);
}


contract ERC721Base is IERC721, ERC165 {
    using IsContract for address;

    bytes4 private constant ERC721_RECEIVED = 0x150b7a02;
    bytes4 private constant ERC721_RECEIVED_LEGACY = 0xf0b9e5ba;

    bytes4 private constant ERC_721_INTERFACE = 0x80ac58cd;
    bytes4 private constant ERC_721_METADATA_INTERFACE = 0x5b5e139f;
    bytes4 private constant ERC_721_ENUMERATION_INTERFACE = 0x780e9d63;

    // What address owns an asset.
    mapping(uint256 => address) private _ownerOf;
    mapping(address => uint256[]) public allAssetsOf;
    mapping(address => mapping(address => bool)) private operators;
    // What address has been particularly authorized to move an asset
    mapping(uint256 => address) private _approval;
    mapping(uint256 => uint256) public indexOfAsset;

    uint256[] public erc721Ids;

    constructor(string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;

        _registerInterface(ERC_721_INTERFACE);
        _registerInterface(ERC_721_METADATA_INTERFACE);
        _registerInterface(ERC_721_ENUMERATION_INTERFACE);
    }

    // ///
    // ERC721 Metadata
    // ///

    /// ERC-721 Non-Fungible Token Standard, optional metadata extension
    /// See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
    /// Note: the ERC-165 identifier for this interface is 0x5b5e139f.

    event SetURIProvider(URIProvider _uriProvider);

    string private _name;
    string private _symbol;

    URIProvider private _uriProvider;

    // @notice A descriptive name for a collection of NFTs in this contract
    function name() external view returns (string memory) {
        return _name;
    }

    // @notice An abbreviated name for NFTs in this contract
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    /**
    * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
    * @dev Throws if `_erc721Id` is not a valid NFT. URIs are defined in RFC
    *  3986. The URI may point to a JSON file that conforms to the "ERC721
    *  Metadata JSON Schema".
    */
    function tokenURI(uint256 _erc721Id) external view returns (string memory) {
        require(_ownerOf[_erc721Id] != address(0), "Asset does not exist");
        URIProvider provider = _uriProvider;
        return provider == URIProvider(0) ? "" : provider.tokenURI(_erc721Id);
    }

    function _setURIProvider(URIProvider _provider) internal {
        emit SetURIProvider(_provider);
        _uriProvider = _provider;
    }

    /**
     * @dev Gets the total amount of assets stored by the contract
     * @return uint256 representing the total amount of assets
     */
    function totalSupply() external view returns (uint256) {
        return erc721Ids.length;
    }

    function allErc721Ids() external view returns (uint256[] memory) {
        return erc721Ids;
    }

    function assetsOf(address _owner) external view returns (uint256[] memory) {
        return allAssetsOf[_owner];
    }

    /**
    * @notice Enumerate valid NFTs
    * @dev Throws if `_index` >= `totalSupply()`.
    * @param _index A counter less than `totalSupply()`
    * @return The ERC721 identifier for the `_index` of the NFT,
    *  (sort order not specified)
    */
    function erc721ByIndex(uint256 _index) external view returns (uint256) {
        require(_index < erc721Ids.length, "Index out of bounds");
        return erc721Ids[_index];
    }

    /**
    * @notice Enumerate NFTs assigned to an owner
    * @dev Throws if `_index` >= `balanceOf(_owner)` or if
    *  `_owner` is the zero address, representing invalid NFTs.
    * @param _owner An address where we are interested in NFTs owned by them
    * @param _index A counter less than `balanceOf(_owner)`
    * @return The ERC721 identifier for the `_index` of the NFT assigned to `_owner`,
    *   (sort order not specified)
    */
    function erc721OfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256) {
        require(_index < allAssetsOf[_owner].length, "Index out of bounds");
        return allAssetsOf[_owner][_index];
    }

    //
    // Owner-centric getter functions
    //

    function ownerOf(uint256 _erc721Id) external view returns (address){
        return _ownerOf[_erc721Id];
    }

    function getApproved(uint256 _erc721Id) external view returns (address){
        return _approval[_erc721Id];
    }

    /**
     * @dev Gets the balance of the specified address
     * @param _owner address to query the balance of
     * @return uint256 representing the amount owned by the passed address
     */
    function balanceOf(address _owner) external view returns (uint256) {
        return allAssetsOf[_owner].length;
    }

    //
    // Authorization getters
    //

    /**
     * @dev Query whether an address has been authorized to move any assets on behalf of someone else
     * @param _operator the address that might be authorized
     * @param _owner the address that provided the authorization
     * @return bool true if the operator has been authorized to move any assets
     */
    function isApprovedForAll(address _operator, address _owner) external view returns (bool) {
        return operators[_owner][_operator];
    }

    /**
     * @dev Query if an operator can move an asset.
     * @param _operator the address that might be authorized
     * @param _assetId the asset that has been `approved` for transfer
     * @return bool true if the asset has been approved by the owner
     */
    function isAuthorized(address _operator, uint256 _assetId) external view returns (bool) {
        address owner = _ownerOf[_assetId];
        return _operator == owner || _approval[_assetId] == _operator || operators[owner][_operator];
    }

    //
    // Authorization
    //

    /**
     * @dev Authorize a third party operator to manage (send) msg.sender's asset
     * @param _operator address to be approved
     * @param _authorized bool set to true to authorize, false to withdraw authorization
     */
    function setApprovalForAll(address _operator, bool _authorized) external {
        if (operators[msg.sender][_operator] != _authorized) {
            operators[msg.sender][_operator] = _authorized;
            emit ApprovalForAll(msg.sender, _operator, _authorized);
        }
    }

    /**
     * @dev Authorize a third party operator to manage one particular asset
     * @param _operator address to be approved
     * @param _assetId asset to approve
     */
    function approve(address _operator, uint256 _assetId) external {
        address owner = _ownerOf[_assetId];
        require(msg.sender == owner || operators[owner][msg.sender], "msg.sender can't approve");

        if (_approval[_assetId] != _operator) {
            _approval[_assetId] = _operator;
            emit Approval(owner, _operator, _assetId);
        }
    }

    //
    // Supply-altering functions
    //

    function _generate(uint256 _assetId, address _beneficiary) internal {
        require(_ownerOf[_assetId] == address(0), "Asset already exists");

        _ownerOf[_assetId] = _beneficiary;
        indexOfAsset[_assetId] = allAssetsOf[_beneficiary].push(_assetId) - 1;
        erc721Ids.push(_assetId);

        emit Transfer(address(0), _beneficiary, _assetId);
    }

    //
    // Transaction related operations
    //

    /**
     * @dev Alias of `safeTransferFrom(from, to, assetId, '')`
     *
     * @param _from address that currently owns an asset
     * @param _to address to receive the ownership of the asset
     * @param _assetId uint256 ID of the asset to be transferred
     */
    function safeTransferFrom(address _from, address _to, uint256 _assetId) external {
        _doTransferFrom(_from, _to, _assetId, "", true);
    }

    /**
     * @dev Securely transfers the ownership of a given asset from one address to
     * another address, calling the method `onNFTReceived` on the target address if
     * there's code associated with it
     *
     * @param _from address that currently owns an asset
     * @param _to address to receive the ownership of the asset
     * @param _assetId uint256 ID of the asset to be transferred
     * @param _userData bytes arbitrary user information to attach to this transfer
     */
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _assetId,
        bytes calldata _userData
    ) external {
        _doTransferFrom(_from, _to, _assetId, _userData, true);
    }

    /**
     * @dev Transfers the ownership of a given asset from one address to another address
     * Warning! This function does not attempt to verify that the target address can send
     * erc721Ids.
     *
     * @param _from address sending the asset
     * @param _to address to receive the ownership of the asset
     * @param _assetId uint256 ID of the asset to be transferred
     */
    function transferFrom(address _from, address _to, uint256 _assetId) external {
        _doTransferFrom(_from, _to, _assetId, "", false);
    }

    /**
     * Internal function that moves an asset from one owner to another
     */
    function _doTransferFrom(
        address _from,
        address _to,
        uint256 _assetId,
        bytes memory _userData,
        bool _doCheck
    ) internal {
        require(_to != address(0), "Target can't be 0x0");
        address owner = _ownerOf[_assetId];
        require(
            msg.sender == owner || _approval[_assetId] == msg.sender || operators[owner][msg.sender],
            "msg.sender Not authorized"
        );
        require(_from == owner, "Not current owner");

        if (_approval[_assetId] != address(0)) {
            delete _approval[_assetId];
            emit Approval(_from, address(0), _assetId);
        }

        uint256 assetIndex = indexOfAsset[_assetId];
        uint256 lastAssetIndex = allAssetsOf[_from].length - 1;

        if (assetIndex != lastAssetIndex){
            uint256 lastAssetId = allAssetsOf[_from][lastAssetIndex];
            allAssetsOf[_from][assetIndex] = lastAssetId;
            indexOfAsset[lastAssetId] = assetIndex;
        }

        delete allAssetsOf[_from][lastAssetIndex];

        allAssetsOf[_from].length--;

        _ownerOf[_assetId] = _to;

        indexOfAsset[_assetId] = allAssetsOf[_to].push(_assetId) - 1;

        if (_doCheck && _to.isContract()) {
            // Perform check with the new safe call
            // onERC721Received(address,address,uint256,bytes)
            (bool success, bytes4 result) = _noThrowCall(
                _to,
                abi.encodeWithSelector(
                    ERC721_RECEIVED,
                    msg.sender,
                    _from,
                    _assetId,
                    _userData
                )
            );

            if (!success || result != ERC721_RECEIVED) {
                // Try legacy safe call
                // onERC721Received(address,uint256,bytes)
                (success, result) = _noThrowCall(
                    _to,
                    abi.encodeWithSelector(
                        ERC721_RECEIVED_LEGACY,
                        _from,
                        _assetId,
                        _userData
                    )
                );

                require(
                    success && result == ERC721_RECEIVED_LEGACY,
                    "Contract rejected the token"
                );
            }
        }

        emit Transfer(_from, _to, _assetId);
    }

    //
    // Utilities
    //

    function _noThrowCall(address _contract, bytes memory _data) internal returns (bool success, bytes4 result) {
        bytes memory returnData;
        (success, returnData) = _contract.call(_data);

        if (returnData.length > 0)
            result = abi.decode(returnData, (bytes4));
    }
}

// File: contracts/interfaces/IERC173.sol

pragma solidity ^0.5.6;


/// @title ERC-173 Contract Ownership Standard
/// @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-173.md
///  Note: the ERC-165 identifier for this interface is 0x7f5828d0
interface IERC173 {
    /// @dev This emits when ownership of a contract changes.
    event OwnershipTransferred(address indexed _previousOwner, address indexed _newOwner);

    /// @notice Get the address of the owner
    /// @return The address of the owner.
    function owner() view external;

    /// @notice Set the address of the new owner of the contract
    /// @param _newOwner The address of the new owner of the contract
    function transferOwnership(address _newOwner) external;
}

// File: contracts/utils/Ownable.sol

pragma solidity ^0.5.6;



contract Ownable is IERC173 {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "The owner should be the sender");
        _;
    }

    constructor() public {
        owner = msg.sender;
        emit OwnershipTransferred(address(0x0), msg.sender);
    }

    /**
        @dev Transfers the ownership of the contract.

        @param _newOwner Address of the new owner
    */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "0x0 Is not a valid owner");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

// File: contracts/interfaces/IBalanceManager.sol

pragma solidity ^0.5.6;


contract IBalanceManager {
    event Transfer(address indexed _from, address indexed _to, address _token, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, address _token, uint256 _value);
    event Deposit(address indexed _from, address indexed _to, address _token, uint256 _value);
    event Withdraw(address indexed _from, address indexed _to, address _token, uint256 _value);

    address public constant ETH = 0x0000000000000000000000000000000000000000;

    function totalSupply(address _token) external view returns (uint256 internalSupply);
    function balanceOf(address _owner, address _token) external view returns (uint256 balance);
    function allowance(address _owner, address _spender, address _token) external view returns (uint256 value);

    function transfer(address _to, address _token, uint256 _value) external returns (bool success);
    function transferFrom(address _from, address _to, address _token, uint256 _value) external returns (bool success);
    function approve(address _spender, address _token, uint256 _value) external returns (bool success);

    function deposit(address _to, address _token, uint256 _value) external payable;
    function depositFrom(address _from, address _to, address _token, uint256 _value) external payable;

    function withdraw(address payable _to, address _token, uint256 _value) external;
    function withdrawFrom(address _from, address payable _to, address _token, uint256 _value) external;
}

// File: contracts/interfaces/IERC20.sol

pragma solidity ^0.5.6;


interface IERC20 {
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);
    function approve(address _spender, uint256 _value) external returns (bool success);
    function increaseApproval (address _spender, uint _addedValue) external returns (bool success);
    function balanceOf(address _owner) external view returns (uint256 balance);
}

// File: contracts/utils/SafeERC20.sol

pragma solidity ^0.5.6;



/**
* @dev Library to perform safe calls to standard method for ERC20 tokens.
*
* Why Transfers: transfer methods could have a return value (bool), throw or revert for insufficient funds or
* unathorized value.
*
* Why Approve: approve method could has a return value (bool) or does not accept 0 as a valid value (BNB token).
* The common strategy used to clean approvals.
*
* We use the Solidity call instead of interface methods because in the case of transfer, it will fail
* for tokens with an implementation without returning a value.
* Since versions of Solidity 0.4.22 the EVM has a new opcode, called RETURNDATASIZE.
* This opcode stores the size of the returned data of an external call. The code checks the size of the return value
* after an external call and reverts the transaction in case the return data is shorter than expected
*/
library SafeERC20 {
    /**
    * @dev Transfer token for a specified address
    * @param _token erc20 The address of the ERC20 contract
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the _value of tokens to be transferred
    * @return bool whether the transfer was successful or not
    */
    function safeTransfer(IERC20 _token, address _to, uint256 _value) internal returns (bool) {
        uint256 prevBalance = _token.balanceOf(address(this));

        if (prevBalance < _value) {
            // Insufficient funds
            return false;
        }

        address(_token).call(
            abi.encodeWithSignature("transfer(address,uint256)", _to, _value)
        );

        if (prevBalance - _value != _token.balanceOf(address(this))) {
            // Transfer failed
            return false;
        }

        return true;
    }

    /**
    * @dev Transfer tokens from one address to another
    * @param _token erc20 The address of the ERC20 contract
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the _value of tokens to be transferred
    * @return bool whether the transfer was successful or not
    */
    function safeTransferFrom(
        IERC20 _token,
        address _from,
        address _to,
        uint256 _value
    ) internal returns (bool)
    {
        uint256 prevBalance = _token.balanceOf(_from);

        if (prevBalance < _value) {
            // Insufficient funds
            return false;
        }

        if (_token.allowance(_from, address(this)) < _value) {
            // Insufficient allowance
            return false;
        }

        address(_token).call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", _from, _to, _value)
        );

        if (prevBalance - _value != _token.balanceOf(_from)) {
            // Transfer failed
            return false;
        }

        return true;
    }

   /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   *
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * @param _token erc20 The address of the ERC20 contract
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   * @return bool whether the approve was successful or not
   */
    function safeApprove(IERC20 _token, address _spender, uint256 _value) internal returns (bool) {
        address(_token).call(
            abi.encodeWithSignature("approve(address,uint256)",_spender, _value)
        );

        if (_token.allowance(address(this), _spender) != _value) {
            // Approve failed
            return false;
        }

        return true;
    }

   /**
   * @dev Clear approval
   * Note that if 0 is not a valid value it will be set to 1.
   * @param _token erc20 The address of the ERC20 contract
   * @param _spender The address which will spend the funds.
   */
    function clearApprove(IERC20 _token, address _spender) internal returns (bool) {
        bool success = safeApprove(_token, _spender, 0);

        if (!success) {
            success = safeApprove(_token, _spender, 1);
        }

        return success;
    }
}

// File: contracts/utils/BalanceManager.sol

pragma solidity ^0.5.6;





contract BalanceManager is IBalanceManager {
    using SafeERC20 for IERC20;

    // [wallet/contract, Token] to balance
    mapping (address => mapping (address => uint256)) internal _toBalance;

    // [wallet/contract(owner), wallet/contract(spender), Token] to _allowance
    mapping (address =>
        mapping (address =>
            mapping (address => uint256)
        )
    ) internal _allowance;

    function () external payable {
        _toBalance[msg.sender][ETH] += msg.value;
        emit Deposit(msg.sender, msg.sender, ETH, msg.value);
    }

    function totalSupply(address _token) external view returns (uint256 internalSupply) {
        return _token == ETH ? address(this).balance : IERC20(_token).balanceOf(address(this));
    }

    function balanceOf(address _owner, address _token) external view returns (uint256) {
        return _toBalance[_owner][_token];
    }

    function allowance(address _owner, address _spender, address _token) external view returns (uint256) {
        return _allowance[_owner][_spender][_token];
    }

    function transfer(address _to, address _token, uint256 _value) external returns(bool) {
        return _transfer(msg.sender, _to, _token, _value);
    }

    function transferFrom(address _from, address _to, address _token, uint256 _value) external returns (bool success) {
        return _transferFrom(_from, _to, _token, _value);
    }

    function _transferFrom(address _from, address _to, address _token, uint256 _value) internal returns (bool success) {
        // Here check _allowance underflow
        require(_allowance[_from][msg.sender][_token] >= _value, "Insufficient _allowance to transferFrom");
        _allowance[_from][msg.sender][_token] -= _value;

        return _transfer(_from, _to, _token, _value);
    }

    function _transfer(address _from, address _to, address _token, uint256 _value) internal returns(bool) {
        require(_to != address(0), "_to should not be 0x0");

        // Here check _toBalance underflow
        require(_toBalance[_from][_token] >= _value, "Insufficient founds to transfer");

        _toBalance[_from][_token] -= _value;
        // Yes, this can overflow but who wants a ERC20 what has an astronomical number of token?
        _toBalance[_to][_token] += _value;

        emit Transfer(_from, _to, _token, _value);

        return true;
    }

    function approve(address _spender, address _token, uint256 _value) external returns (bool success) {
        _allowance[msg.sender][_spender][_token] = _value;
        emit Approval(msg.sender, _spender, _token, _value);

        return true;
    }

    function deposit(address _to, address _token, uint256 _amount) external payable {
        _deposit(msg.sender, _to, _token, _amount);
    }

    function depositFrom(address _from, address _to, address _token, uint256 _amount) external payable {
        _deposit(_from, _to, _token, _amount);
    }

    function _deposit(address _from, address _to, address _token, uint256 _amount) internal returns(bool) {
        require(_to != address(0), "_to should not be 0x0");

        if (_token == ETH)
            require(_amount == msg.value, "The amount should be equal to msg.value");
        else
            require(
                IERC20(_token).transferFrom(_from, address(this), _amount) && msg.value == 0,
                "Error pulling tokens or send ETH, in deposit"
            );
        // Yes, this can overflow but who wants a ERC20 what has an astrological number of tokens?
        _toBalance[_to][_token] += _amount;

        emit Deposit(_from, _to, _token, _amount);
    }

    function withdraw(address payable _to, address _token, uint256 _value) external {
        _withdraw(msg.sender, _to, _token, _value);
    }

    function withdrawFrom(address _from, address payable _to, address _token, uint256 _value) external {
        // Here check _allowance underflow
        require(_allowance[_from][msg.sender][_token] >= _value, "Insufficient _allowance to transferFrom");
        _allowance[_from][msg.sender][_token] -= _value;

        _withdraw(_from, _to, _token, _value);
    }

    function _withdraw(address _from, address payable _to, address _token, uint256 _value) internal {
        require(_to != address(0), "_to should not be 0x0");
        require(_toBalance[_from][_token] >= _value, "Insufficient founds to discount");

        _toBalance[_from][_token] -= _value;

        if (_token == ETH)
            _to.transfer(_value);
        else
            require(IERC20(_token).transfer(_to, _value), "Error transfer tokens, in withdraw");

        emit Withdraw(_from, _to, _token, _value);
    }

    function withdrawAll(address payable _to, address _token) external {
        require(_to != address(0), "_to should not be 0x0");

        uint256 addrBal = _toBalance[msg.sender][_token];
        delete (_toBalance[msg.sender][_token]);

        if (_token == ETH)
            _to.transfer(addrBal);
        else
            require(IERC20(_token).transfer(_to, addrBal), "Error transfer tokens, in withdrawAll");

        emit Withdraw(msg.sender, _to, _token, addrBal);
    }
}

// File: contracts/GamblingManager.sol

pragma solidity ^0.5.6;








contract IdHelper {
    mapping(address => uint256) public nonces;

    function buildId(address _creator, uint256 _nonce) external view returns (bytes32) {
        return keccak256(abi.encodePacked(uint8(1), address(this), _creator, _nonce));
    }

    function buildId2(
        address _creator,
        address _erc20,
        IModel _model,
        bytes calldata _data,
        uint256 _salt
    ) external view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                uint8(2),
                address(this),
                _creator,
                _erc20,
                _model,
                _data,
                _salt
            )
        );
    }

    function buildId3(address _creator, uint256 _salt) external view returns (bytes32) {
        return keccak256(abi.encodePacked(uint8(3), address(this), _creator, _salt));
    }
}


contract TipERC20 is BalanceManager, ITipERC20, Ownable {
    function tip(address _from, address _token, uint256 _amount) external payable {
        require(_amount != 0, "The amount should not be 0");
        uint256 tansferAmount;

        if (_token == ETH) {
            if (msg.value > 0) {
                require(_amount >= msg.value, "The msg.value should be more or equal than the _amount");
                tansferAmount = _amount - msg.value;
                _deposit(_from, owner, _token, msg.value);
            } else {
                tansferAmount = _amount;
            }
        } else {
            require(msg.value == 0, "The msg.value should be 0");
            if (_amount > _toBalance[_from][_token]) {
                tansferAmount = _amount - _toBalance[_from][_token];
                _deposit(_from, owner, _token, tansferAmount);
                tansferAmount = _amount - tansferAmount;
            } else {
                tansferAmount = _amount;
            }
        }

        if (tansferAmount != 0)
            _transferFrom(_from, owner, _token, tansferAmount);

        emit Tip(_from, _token, _amount);
    }
}


contract GamblingManager is TipERC20, IdHelper, IGamblingManager, ERC721Base {
    struct Bet {
        address erc20;
        uint256 balance;
        IModel model;
    }

    mapping(bytes32 => Bet) public toBet;

    constructor() public ERC721Base("Ethereum Gambling Bets", "EGB") { }

    function setURIProvider(URIProvider _provider) external onlyOwner {
        _setURIProvider(_provider);
    }

    function create(
        address _erc20,
        IModel _model,
        bytes calldata _data
    ) external returns (bytes32 betId) {
        uint256 nonce = nonces[msg.sender]++;

        betId = keccak256(
            abi.encodePacked(
                uint8(1),
                address(this),
                msg.sender,
                nonce
            )
        );

        _create(betId, _erc20, _model, _data);

        emit Created(msg.sender, betId, _erc20, _data, nonce);
    }

    function create2(
        address _erc20,
        IModel _model,
        bytes calldata _data,
        uint256 _salt
    ) external returns (bytes32 betId) {
        betId = keccak256(
            abi.encodePacked(
                uint8(2),
                address(this),
                msg.sender,
                _erc20,
                _model,
                _data,
                _salt
            )
        );

        _create(betId, _erc20, _model, _data);

        emit Created2(msg.sender, betId, _erc20, _data, _salt);
    }

    function create3(
        address _erc20,
        IModel _model,
        bytes calldata _data,
        uint256 _salt
    ) external returns(bytes32 betId) {
        betId = keccak256(abi.encodePacked(uint8(3), address(this), msg.sender, _salt));

        _create(betId, _erc20, _model, _data);

        emit Created3(msg.sender, betId, _erc20, _data, _salt);
    }

    function play(
        address _player,
        bytes32 _betId,
        uint256 _maxAmount,
        bytes calldata _data
    ) external payable returns(bool) {
        Bet storage bet = toBet[_betId];

        uint256 needAmount = bet.model.play(msg.sender, _betId, _player, _data);
        require(needAmount <= _maxAmount, "The needAmount must be less or equal than _maxAmount");

        if (msg.sender != _player) {
            require(msg.value == 0, "The msg.value should be 0");
            _transferFrom(_player, address(this), bet.erc20, needAmount);
        } else {
            if (_toBalance[_player][bet.erc20] < needAmount)
                _deposit(_player, _player, bet.erc20, needAmount - _toBalance[_player][bet.erc20]);
            _transfer(_player, address(this), bet.erc20, needAmount);
        }

        // Add balance to Bet
        bet.balance += needAmount;

        emit Played(msg.sender, _player, _betId, needAmount, _data);
    }

    function collect(
        address _beneficiary,
        bytes32 _betId,
        bytes calldata _data
    ) external {
        require(_beneficiary != address(0), "_beneficiary should not be 0x0");
        Bet storage bet = toBet[_betId];

        uint256 amount = bet.model.collect(msg.sender, _betId, _beneficiary, _data);

        require(amount <= bet.balance, "Insufficient founds to discount from bet balance");
        bet.balance -= amount;

        _transfer(address(this), _beneficiary, bet.erc20, amount);

        emit Collected(
            msg.sender,
            _betId,
            _beneficiary,
            amount,
            _data
        );
    }

    function cancel(bytes32 _betId, bytes calldata _data) external {
        Bet storage bet = toBet[_betId];
        require(bet.model != IModel(0), "The bet its not exist or was canceled");

        require(bet.model.cancel(msg.sender, _betId, _data), "The bet cant cancel");

        delete (bet.model);

        uint256 balance = bet.balance;
        delete (bet.balance);
        _transfer(address(this), msg.sender, bet.erc20, balance);

        emit Canceled(msg.sender, _betId, balance, _data);
    }

    function modelTransfer (
        address _beneficiary,
        bytes32 _betId,
        uint256 _amount
    ) external {
        require(_beneficiary != address(0), "_beneficiary should not be 0x0");
        Bet storage bet = toBet[_betId];

        require(msg.sender == address(bet.model), "The sender should be the model");
        require(_amount <= bet.balance, "Insufficient founds to discount from bet balance");

        bet.balance -= _amount;
        _transfer(address(this), _beneficiary, bet.erc20, _amount);

        emit ModelTransfer(_betId, _beneficiary, _amount);
    }

    function _create(
        bytes32 _betId,
        address _erc20,
        IModel _model,
        bytes memory _data
    ) internal {
        require(toBet[_betId].model == IModel(0), "The bet is already created");

        require(_model.create(msg.sender, _betId, _data), "Model.create return false");

        _generate(uint256(_betId), msg.sender);

        toBet[_betId] = Bet({
            erc20: _erc20,
            balance: 0,
            model: _model
        });
    }
}

// File: contracts/utils/BytesLib.sol

/*
 * @title Solidity Bytes Arrays Utils
 * @author Gonçalo Sá <goncalo.sa@consensys.net>
 *
 * @dev Bytes tightly packed arrays utility library for ethereum contracts written in Solidity.
 *      The library lets you concatenate, slice and type cast bytes arrays both in memory and storage.
 */

pragma solidity ^0.5.6;


library BytesLib {
    function concat(bytes memory _preBytes, bytes memory _postBytes) internal pure returns (bytes memory tempBytes) {
        assembly {
            // Get a location of some free memory and store it in tempBytes as
            // Solidity does for memory variables.
            tempBytes := mload(0x40)

            // Store the length of the first bytes array at the beginning of
            // the memory for tempBytes.
            let length := mload(_preBytes)
            mstore(tempBytes, length)

            // Maintain a memory counter for the current write location in the
            // temp bytes array by adding the 32 bytes for the array length to
            // the starting location.
            let mc := add(tempBytes, 0x20)
            // Stop copying when the memory counter reaches the length of the
            // first bytes array.
            let end := add(mc, length)

            for {
                // Initialize a copy counter to the start of the _preBytes data,
                // 32 bytes into its memory.
                let cc := add(_preBytes, 0x20)
            } lt(mc, end) {
                // Increase both counters by 32 bytes each iteration.
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } {
                // Write the _preBytes data into the tempBytes memory 32 bytes
                // at a time.
                mstore(mc, mload(cc))
            }

            // Add the length of _postBytes to the current length of tempBytes
            // and store it as the new length in the first 32 bytes of the
            // tempBytes memory.
            length := mload(_postBytes)
            mstore(tempBytes, add(length, mload(tempBytes)))

            // Move the memory counter back from a multiple of 0x20 to the
            // actual end of the _preBytes data.
            mc := end
            // Stop copying when the memory counter reaches the new combined
            // length of the arrays.
            end := add(mc, length)

            for {
                let cc := add(_postBytes, 0x20)
            } lt(mc, end) {
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } {
                mstore(mc, mload(cc))
            }

            // Update the free-memory pointer by padding our last write location
            // to 32 bytes: add 31 bytes to the end of tempBytes to move to the
            // next 32 byte block, then round down to the nearest multiple of
            // 32. If the sum of the length of the two arrays is zero then add
            // one before rounding down to leave a blank 32 bytes (the length block with 0).
            mstore(0x40, and(
              add(add(end, iszero(add(length, mload(_preBytes)))), 31),
              not(31) // Round down to the nearest 32 bytes.
            ))
        }
    }

    function concatStorage(bytes storage _preBytes, bytes memory _postBytes) internal {
        assembly {
            // Read the first 32 bytes of _preBytes storage, which is the length
            // of the array. (We don't need to use the offset into the slot
            // because arrays use the entire slot.)
            let fslot := sload(_preBytes_slot)
            // Arrays of 31 bytes or less have an even value in their slot,
            // while longer arrays have an odd value. The actual length is
            // the slot divided by two for odd values, and the lowest order
            // byte divided by two for even values.
            // If the slot is even, bitwise and the slot with 255 and divide by
            // two to get the length. If the slot is odd, bitwise and the slot
            // with -1 and divide by two.
            let slength := div(and(fslot, sub(mul(0x100, iszero(and(fslot, 1))), 1)), 2)
            let mlength := mload(_postBytes)
            let newlength := add(slength, mlength)
            // slength can contain both the length and contents of the array
            // if length < 32 bytes so let's prepare for that
            // v. http://solidity.readthedocs.io/en/latest/miscellaneous.html#layout-of-state-variables-in-storage
            switch add(lt(slength, 32), lt(newlength, 32))
            case 2 {
                // Since the new array still fits in the slot, we just need to
                // update the contents of the slot.
                // uint256(bytes_storage) = uint256(bytes_storage) + uint256(bytes_memory) + new_length
                sstore(
                    _preBytes_slot,
                    // all the modifications to the slot are inside this
                    // next block
                    add(
                        // we can just add to the slot contents because the
                        // bytes we want to change are the LSBs
                        fslot,
                        add(
                            mul(
                                div(
                                    // load the bytes from memory
                                    mload(add(_postBytes, 0x20)),
                                    // zero all bytes to the right
                                    exp(0x100, sub(32, mlength))
                                ),
                                // and now shift left the number of bytes to
                                // leave space for the length in the slot
                                exp(0x100, sub(32, newlength))
                            ),
                            // increase length by the double of the memory
                            // bytes length
                            mul(mlength, 2)
                        )
                    )
                )
            }
            case 1 {
                // The stored value fits in the slot, but the combined value
                // will exceed it.
                // get the keccak hash to get the contents of the array
                mstore(0x0, _preBytes_slot)
                let sc := add(keccak256(0x0, 0x20), div(slength, 32))

                // save new length
                sstore(_preBytes_slot, add(mul(newlength, 2), 1))

                // The contents of the _postBytes array start 32 bytes into
                // the structure. Our first read should obtain the `submod`
                // bytes that can fit into the unused space in the last word
                // of the stored array. To get this, we read 32 bytes starting
                // from `submod`, so the data we read overlaps with the array
                // contents by `submod` bytes. Masking the lowest-order
                // `submod` bytes allows us to add that value directly to the
                // stored value.

                let submod := sub(32, slength)
                let mc := add(_postBytes, submod)
                let end := add(_postBytes, mlength)
                let mask := sub(exp(0x100, submod), 1)

                sstore(
                    sc,
                    add(
                        and(
                            fslot,
                            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00
                        ),
                        and(mload(mc), mask)
                    )
                )

                for {
                    mc := add(mc, 0x20)
                    sc := add(sc, 1)
                } lt(mc, end) {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } {
                    sstore(sc, mload(mc))
                }

                mask := exp(0x100, sub(mc, end))

                sstore(sc, mul(div(mload(mc), mask), mask))
            }
            default {
                // get the keccak hash to get the contents of the array
                mstore(0x0, _preBytes_slot)
                // Start copying to the last used word of the stored array.
                let sc := add(keccak256(0x0, 0x20), div(slength, 32))

                // save new length
                sstore(_preBytes_slot, add(mul(newlength, 2), 1))

                // Copy over the first `submod` bytes of the new data as in
                // case 1 above.
                let slengthmod := mod(slength, 32)
                let mlengthmod := mod(mlength, 32)
                let submod := sub(32, slengthmod)
                let mc := add(_postBytes, submod)
                let end := add(_postBytes, mlength)
                let mask := sub(exp(0x100, submod), 1)

                sstore(sc, add(sload(sc), and(mload(mc), mask)))

                for {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } lt(mc, end) {
                    sc := add(sc, 1)
                    mc := add(mc, 0x20)
                } {
                    sstore(sc, mload(mc))
                }

                mask := exp(0x100, sub(mc, end))

                sstore(sc, mul(div(mload(mc), mask), mask))
            }
        }
    }

    function slice(bytes memory _bytes, uint256 _start, uint256 _length) internal pure returns (bytes memory tempBytes){
        require(_bytes.length >= (_start + _length), "Read out of bounds");

        assembly {
            switch iszero(_length)
            case 0 {
                // Get a location of some free memory and store it in tempBytes as
                // Solidity does for memory variables.
                tempBytes := mload(0x40)

                // The first word of the slice result is potentially a partial
                // word read from the original array. To read it, we calculate
                // the length of that partial word and start copying that many
                // bytes into the array. The first word we copy will start with
                // data we don't care about, but the last `lengthmod` bytes will
                // land at the beginning of the contents of the new array. When
                // we're done copying, we overwrite the full first word with
                // the actual length of the slice.
                let lengthmod := and(_length, 31)

                // The multiplication in the next line is necessary
                // because when slicing multiples of 32 bytes (lengthmod == 0)
                // the following copy loop was copying the origin's length
                // and then ending prematurely not copying everything it should.
                let mc := add(add(tempBytes, lengthmod), mul(0x20, iszero(lengthmod)))
                let end := add(mc, _length)

                for {
                    // The multiplication in the next line has the same exact purpose
                    // as the one above.
                    let cc := add(add(add(_bytes, lengthmod), mul(0x20, iszero(lengthmod))), _start)
                } lt(mc, end) {
                    mc := add(mc, 0x20)
                    cc := add(cc, 0x20)
                } {
                    mstore(mc, mload(cc))
                }

                mstore(tempBytes, _length)

                //update free-memory pointer
                //allocating the array padded to 32 bytes like the compiler does now
                mstore(0x40, and(add(mc, 31), not(31)))
            }
            //if we want a zero-length slice let's just return a zero-length array
            default {
                tempBytes := mload(0x40)

                mstore(0x40, add(tempBytes, 0x20))
            }
        }
    }

    function toAddress(bytes memory _bytes, uint256 _start) internal  pure returns (address ret) {
        require(_bytes.length >= (_start + 20), "Read out of bounds");

        assembly {
            ret := div(mload(add(add(_bytes, 0x20), _start)), 0x1000000000000000000000000)
        }
    }

    function toUint8(bytes memory _bytes, uint256 _start) internal  pure returns (uint8 ret) {
        require(_bytes.length >= (_start + 1), "Read out of bounds");

        assembly {
            ret := mload(add(add(_bytes, 0x1), _start))
        }
    }

    function toUint16(bytes memory _bytes, uint256 _start) internal  pure returns (uint16 ret) {
        require(_bytes.length >= (_start + 2), "Read out of bounds");

        assembly {
            ret := mload(add(add(_bytes, 0x2), _start))
        }
    }

    function toUint32(bytes memory _bytes, uint256 _start) internal  pure returns (uint32 ret) {
        require(_bytes.length >= (_start + 4), "Read out of bounds");

        assembly {
            ret := mload(add(add(_bytes, 0x4), _start))
        }
    }

    function toUint256(bytes memory _bytes, uint256 _start) internal  pure returns (uint256 ret) {
        require(_bytes.length >= (_start + 32), "Read out of bounds");

        assembly {
            ret := mload(add(add(_bytes, 0x20), _start))
        }
    }

    function toBytes32(bytes memory _bytes, uint256 _start) internal  pure returns (bytes32 tempBytes32) {
        require(_bytes.length >= (_start + 32), "Read out of bounds");

        assembly {
            tempBytes32 := mload(add(add(_bytes, 0x20), _start))
        }
    }

    function equal(bytes memory _preBytes, bytes memory _postBytes) internal pure returns (bool success) {
        success = true;

        assembly {
            let length := mload(_preBytes)

            // if lengths don't match the arrays are not equal
            switch eq(length, mload(_postBytes))
            case 1 {
                // cb is a circuit breaker in the for loop since there's
                //  no said feature for inline assembly loops
                // cb = 1 - don't breaker
                // cb = 0 - break
                let cb := 1

                let mc := add(_preBytes, 0x20)
                let end := add(mc, length)

                for {
                    let cc := add(_postBytes, 0x20)
                // the next line is the loop condition:
                // while(uint256(mc < end) + cb == 2)
                } eq(add(lt(mc, end), cb), 2) {
                    mc := add(mc, 0x20)
                    cc := add(cc, 0x20)
                } {
                    // if any of these checks fails then arrays are not equal
                    if iszero(eq(mload(mc), mload(cc))) {
                        // unsuccess:
                        success := 0
                        cb := 0
                    }
                }
            }
            default {
                // unsuccess:
                success := 0
            }
        }
    }

    function equalStorage(bytes storage _preBytes, bytes memory _postBytes) internal view returns (bool success) {
        success = true;

        assembly {
            // we know _preBytes_offset is 0
            let fslot := sload(_preBytes_slot)
            // Decode the length of the stored array like in concatStorage().
            let slength := div(and(fslot, sub(mul(0x100, iszero(and(fslot, 1))), 1)), 2)
            let mlength := mload(_postBytes)

            // if lengths don't match the arrays are not equal
            switch eq(slength, mlength)
            case 1 {
                // slength can contain both the length and contents of the array
                // if length < 32 bytes so let's prepare for that
                // v. http://solidity.readthedocs.io/en/latest/miscellaneous.html#layout-of-state-variables-in-storage
                if iszero(iszero(slength)) {
                    switch lt(slength, 32)
                    case 1 {
                        // blank the last byte which is the length
                        fslot := mul(div(fslot, 0x100), 0x100)

                        if iszero(eq(fslot, mload(add(_postBytes, 0x20)))) {
                            // unsuccess:
                            success := 0
                        }
                    }
                    default {
                        // cb is a circuit breaker in the for loop since there's
                        //  no said feature for inline assembly loops
                        // cb = 1 - don't breaker
                        // cb = 0 - break
                        let cb := 1

                        // get the keccak hash to get the contents of the array
                        mstore(0x0, _preBytes_slot)
                        let sc := keccak256(0x0, 0x20)

                        let mc := add(_postBytes, 0x20)
                        let end := add(mc, mlength)

                        // the next line is the loop condition:
                        // while(uint256(mc < end) + cb == 2)
                        for {} eq(add(lt(mc, end), cb), 2) {
                            sc := add(sc, 1)
                            mc := add(mc, 0x20)
                        } {
                            if iszero(eq(sload(sc), mload(mc))) {
                                // unsuccess:
                                success := 0
                                cb := 0
                            }
                        }
                    }
                }
            }
            default {
                // unsuccess:
                success := 0
            }
        }
    }
}

// File: contracts/model/CoinFlip.sol

pragma solidity ^0.5.6;







contract CoinFlip is IModel, Ownable {
    using IsContract for address;
    using BytesLib for bytes;

    event SetMaxBetAmount(bytes32 _id, uint256 _maxBetAmount);
    event SetMultiplier(uint256 _possibility, uint256 _multiplier);

    event Deposit();
    event Win(uint256 _possibility, uint256 _multiplier, uint256 _luckyNumber, uint256 _betNumber);
    event Lose(uint256 _possibility, uint256 _multiplier, uint256 _luckyNumber, uint256 _betNumber);

    GamblingManager public gamblingManager;

    uint256 public constant MULTIPLIER_BASE = 1000000;

    mapping(uint256 => uint256) public possibilitiesToMultiplier;
    mapping(bytes32 => uint256) public toMaxBetAmount;

    modifier onlyGamblingManager() {
        require(msg.sender == address(gamblingManager), "Only the Gambling Manager");
        _;
    }

    constructor(GamblingManager _gamblingManager) public {
        gamblingManager = _gamblingManager;
    }

    function setMaxBetAmount(bytes32 _id, uint256 _maxBetAmount) external onlyOwner {
        toMaxBetAmount[_id] = _maxBetAmount;
        emit SetMaxBetAmount(_id, _maxBetAmount);
    }

    function setMultiplier(uint256 _possibility, uint256 _multiplier) external onlyOwner {
        possibilitiesToMultiplier[_possibility] = _multiplier;
        emit SetMultiplier(_possibility, _multiplier);
    }

    function create(address, bytes32, bytes calldata) external onlyGamblingManager returns(bool) {
        return true;
    }

    /**
        @dev This emits when the obligation of debt change.

        @param _sender The sender of the tx
        @param _id Id of the bet on gambling manager
        @param _player The bet player, the win amount will send of this
        @param _data If the first uint256 its 0: its a deposit, the second uint256 is the amount of the deposit
                      Otherwise, the first uint256 is the amount of the bet, the second id the possibility and the third is the option(lucky number)
    */
    function play(address _sender, bytes32 _id, address _player, bytes calldata _data) external onlyGamblingManager returns(uint256 needAmount) {
        needAmount = _data.toUint256(0);

        if (needAmount == 0) { // Deposit to bet
            needAmount = _data.toUint256(32);
            emit Deposit();
        } else { // Play Bet
            require(!_sender.isContract(), "The sender should not be a contract");

            uint256 possibility = _data.toUint256(32);
            uint256 multiplier = possibilitiesToMultiplier[possibility];
            uint256 winAmount = (needAmount * multiplier) / MULTIPLIER_BASE;

            require(winAmount <= toMaxBetAmount[_id], "The amount of bet is to high");
            (, uint256 balance,) = gamblingManager.toBet(_id);
            require(balance >= winAmount, "Insufficient bet founds");

            uint256 option = _data.toUint256(64);
            require(option < possibility, "The option should be inside of the possibility");

            uint256 winNumber = uint256((keccak256(abi.encodePacked(now, block.difficulty, blockhash(block.number-1))))) % possibility;

            if (winNumber == option) {
                gamblingManager.modelTransfer(_player, _id, winAmount);
                emit Win(possibility, multiplier, winNumber, option);
                return 0;
            }
            emit Lose(possibility, multiplier, winNumber, option);
        }
    }

    function collect(address _sender, bytes32, address, bytes calldata _data) external onlyGamblingManager returns(uint256) {
        require(_sender == owner, "The owner should be the sender");
        return _data.toUint256(0);
    }

    function cancel(address _sender, bytes32, bytes calldata) external onlyGamblingManager returns(bool) {
        require(_sender == owner, "The owner should be the sender");
        return true;
    }

    function validateCreate(address, bytes32, bytes calldata) external view returns(bool) {
        return true;
    }

    function validatePlay(address _sender, bytes32 _id, address _player, bytes calldata _data) external view returns(bool) {
        uint256 needAmount = _data.toUint256(0);
        (address erc20, uint256 balance,) = gamblingManager.toBet(_id);

        if (needAmount == 0) { // Deposit to bet
            require(_data.toUint256(32) >= gamblingManager.balanceOf(_player, erc20), "The depositer dont have balance");
        } else { // Play Bet
            require(!_sender.isContract(), "The sender should not be a contract");
            require(needAmount <= gamblingManager.balanceOf(_player, erc20), "The player dont have balance");

            uint256 possibility = _data.toUint256(32);
            require(possibilitiesToMultiplier[possibility] != 0, "The multiplier should not be 0");
            require(_data.toUint256(64) < possibility, "Option out of bounds");

            uint256 winAmount = (needAmount * possibilitiesToMultiplier[possibility]) / MULTIPLIER_BASE;
            require(winAmount <= toMaxBetAmount[_id], "The bet amount its to high");
            require(winAmount <= balance, "The contract dont have balance");
        }
        return true;
    }

    function simActualReturn(bytes32, bytes calldata _data) external view returns (uint256 needAmount, bool canChange) {
        needAmount = _data.toUint256(0);

        if (needAmount != 0) { // Play to bet
            needAmount = (needAmount * possibilitiesToMultiplier[_data.toUint256(32)]) / MULTIPLIER_BASE;
            canChange = true;
        }
    }

    function getEnd(bytes32) external view returns (uint256) {
        return 0;
    }

    function getNoMoreBets(bytes32) external view returns (uint256) {
        return 0;
    }

    function simNeedAmount(bytes32, bytes calldata _data) external view returns (uint256 needAmount, bool canChange) {
        needAmount = _data.toUint256(0);

        if (needAmount == 0) { // Deposit to bet
            needAmount = _data.toUint256(32);
        } else {
            canChange = true;
        }
    }
}
