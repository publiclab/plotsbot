const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

const Behavior = require('../models/behavior');

const unresponsiveAction = () => {
  // Make a timeout for 10 minutes (10 * 60 * 1000 milliseconds)
  return setTimeoutPromise(10 * 60 * 1000).then(() => {
    return 'Hi, looks like nobody\'s around just now. If you have \
a question, you can post it a https://publiclab.org/questions, or \
if you need help with a software issue, you can open an issue at \
https://github.com/publiclab/plots2/issues/new -- thanks!';
  });
};

module.exports = new Behavior('message', unresponsiveAction);
