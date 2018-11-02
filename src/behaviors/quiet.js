const MemoryBehavior = require('../models/memory-behavior');

module.exports = (state) => {
  // should run only on unrecognized users
  const quietAction = (botNick, username) => {
    var exempt = false;
    if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
    if (exempt !== true) {
      client.client.send('quiet', '#publiclab', username); // attempting here
      // return `/quiet ${username}`; // this didn't work, it just "spoke" it
    }
  };

 return new MemoryBehavior('join', quietAction);
}
