const Behavior = require('../models/behavior');

module.exports = ({ responseTime, offsetTime }) => {
  let currentTimeout;
  let recognized = []; 

  const unresponsiveAction = (channel, username, botNick) => {
    let secondsCounter = parseInt(Date.now()/(1000*1000)); // 1000 seconds
    let userAndTime = username + secondsCounter; // remember people from the last 1000 seconds
    if(!utils.contains(recognized, userAndTime)) greeted.push(userAndTime);
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    return new Promise((resolve, reject) => {
      currentTimeout = setTimeout(() => {
        currentTimeout = undefined;
        if(!utils.contains(recognized, userAndTime)) {
          resolve('Hi, looks like nobody\'s around just now. If you have a question, you can post it a https://publiclab.org/questions, or if you need help with a software issue, you can open an issue at https://github.com/publiclab/plots2/issues/new -- thanks!');
        } else {
          resolve(''); // what to do here?
        }
      }, responseTime);

      setTimeout(() => {
        reject();
      }, responseTime + offsetTime);
    });
  };

  return new Behavior('message', unresponsiveAction);
};
