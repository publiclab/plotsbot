const MemoryBehavior = require('../models/memory-behavior');

const greetAction = (botNick, username) => {
  return `Welcome to Publiclab, ${username}! Here's a link to the Code of Conduct that's in effect in this, and all other spaces of Public Lab: https://publiclab.org/conduct. For a quick walkthrough, send the message: \`${botNick} help\``;
};

module.exports = new MemoryBehavior('join', greetAction);
