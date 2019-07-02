module.exports.getEvent = (contract, eventName, log) => {
  return eventName + ', ' + log.blockNumber + ', ' + log.logIndex;// TODO return the event
};
