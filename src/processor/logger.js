module.exports.processedBlocks = (from, to) => {
  console.log('Process: ' + from + ' to ' + to + ' blocks logs, interval: ' + (to - from));
};

module.exports.wait = (ms) => {
  console.log('Wait: ' + ms + ' ms');
};

module.exports.commit = (commit) => {
  console.log('Commit: ' + JSON.stringify(commit));
};
