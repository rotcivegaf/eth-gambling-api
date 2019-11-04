const Event = require('../Event.js');
const GamblingManagerJson = require('../../build/contracts/GamblingManager.json');

module.exports = class GamblingManager extends Event {
  constructor() {
    super();

    this.contractName = GamblingManagerJson.contractName;
  }
};
