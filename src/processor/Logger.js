module.exports = class Logger {
  processedBlocks(from, to) {
    console.log('Process: ' + from + ' to ' + to + ' blocks logs, interval: ' + (to - from));
  }

  wait(ms){
    console.log('Wait: ' + ms + ' ms');
  }

  log(contractName, eventName) {
    console.log(contractName + ' ' + eventName);
  }

  commit(commit) {
    console.log('Commit: ' + JSON.stringify(commit));
  }
};
