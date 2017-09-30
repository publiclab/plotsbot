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
        resolve('Hi, looks like nobody\'s around just now. If you have a question, you can post it a https://publiclab.org/questions, or if you need help with a software issue, you can open an issue at https://github.com/publiclab/plots2/issues/new -- thanks!');
      }, responseTime);

      setTimeout(() => {
        reject();
      }, responseTime + offsetTime);
    });
  };

  return new Behavior('message', unresponsiveAction);
};
