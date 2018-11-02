const MemoryBehavior = require('../models/memory-behavior');

// should run only on unrecognized users
const quietAction = (botNick, username) => {
  if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
  if (exempt) {
    return `/quiet ${username}`;
  }
};

module.exports = new MemoryBehavior('join', quietAction);
