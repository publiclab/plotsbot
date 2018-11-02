const MemoryBehavior = require('../models/memory-behavior');

// should run only on unrecognized users
const quietAction = (botNick, username) => {
  var exempt = false;
  if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
  if (exempt !== true) {
    return `/quiet ${username}`;
  }
};

module.exports = new MemoryBehavior('join', quietAction);
