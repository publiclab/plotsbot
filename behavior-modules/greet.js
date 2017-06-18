const Behavior = require('../models/behavior');

const greetAction = (channel, username, botNick) => {
  return `Welcome to Publiclab, ${username}! For a quick walkthrough, send the message: \`${botNick} help\``;
};

module.exports = new Behavior('join', greetAction);
