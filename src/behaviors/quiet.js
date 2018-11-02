const MemoryBehavior = require('../models/memory-behavior');

// should run only on unrecognized users
const quietAction = (botNick, username) => {
  client = new IrcClient(config.server, config.name, config.channels);
  var exempt = false;
  if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
  if (exempt !== true) {
    client.client.send('quiet', '#publiclab', username); // attempting here
    // return `/quiet ${username}`; // this didn't work, it just "spoke" it
  }
};

module.exports = new MemoryBehavior('join', quietAction);
