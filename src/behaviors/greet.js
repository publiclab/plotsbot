const Behavior = require('../models/behavior');
const utils = require('../utils');

let greeted = [];

const greetAction = (botNick, username) => {
  if (!utils.contains(greeted, username)) {
    greeted.push(username);
    return `Welcome to Publiclab, ${username}! Here's a link to the Code of Conduct that's in effect in this, and all other spaces of Public Lab: https://publiclab.org/conduct. For a quick walkthrough, send the message: \`${botNick} help\``;
  }
};

module.exports = new Behavior('join', greetAction);
