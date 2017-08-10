const Behavior = require('../models/behavior');
const utils = require('../utils');

let heatAction = () => {
  return utils.exec('hddtemp /dev/sd?');
};

module.exports = new Behavior('message', heatAction, 'heat');
