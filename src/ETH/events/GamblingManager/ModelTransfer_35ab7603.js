const GamblingManager = require('./GamblingManager.js');

module.exports = class ModelTransfer_35ab7603 extends GamblingManager {
  constructor(w3Utils, redisClient) {
    super(w3Utils, redisClient);

    this.signature = 'ModelTransfer(bytes32,address,address,uint256)';
    this.hexSignature = '0x35ab7603615e966c2fd7b33a8779b3227e56fc06c72e2f87fb419f9aac74caa8';
    this.inputs = [
      {
        'indexed':true,
        'name':'_id',
        'type':'bytes32'
      },
      {
        'indexed':true,
        'name':'_model',
        'type':'address'
      },
      {
        'indexed':true,
        'name':'_beneficiary',
        'type':'address'
      },
      {
        'indexed':false,
        'name':'_amount',
        'type':'uint256'
      }
    ];
  }

  async process(log) {
  }
};
