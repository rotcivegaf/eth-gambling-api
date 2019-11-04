module.exports.processedBlocks = (from, to) => {
  console.log('Process: ' + from + ' to ' + to + ' blocks logs, interval: ' + (to - from));
};

module.exports.wait = (ms) => {
  console.log('Wait: ' + ms + ' ms');
};

module.exports.log = (contractName, eventName) => {
  console.log(contractName + ' ' + eventName);
};

module.exports.commit = (commit) => {
  console.log('Commit: ' + JSON.stringify(commit));
};
