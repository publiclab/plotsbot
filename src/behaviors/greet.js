const Behavior = require('../models/behavior');
const utils = require('../utils');

let greeted = [];

const greetAction = (channel, username, botNick) => {
  if(!utils.contains(greeted, username)) {
    greeted.push(username);
    return `Welcome to Publiclab, ${username}! For a quick walkthrough, send the message: \`${botNick} help\``;
  }
};

module.exports = new Behavior('join', greetAction);
