const Behavior = require('../models/behavior');

let versionAction = (botNick) => {
  return `${botNick} is running package ${process.env.npm_package_name} at version ${process.env.npm_package_version}`;
};

module.exports = new Behavior('message', versionAction, 'version');
