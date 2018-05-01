const Behavior = require('../models/behavior');

module.exports = ({ responseTime, offsetTime }) => {
  let currentTimeout;

  const unresponsiveAction = () => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    return new Promise((resolve, reject) => {
      currentTimeout = setTimeout(() => {
        currentTimeout = undefined;
        resolve('');
      }, responseTime);

      setTimeout(() => {
        reject();
      }, responseTime + offsetTime);
    });
  };

  return new Behavior('message', unresponsiveAction);
};
