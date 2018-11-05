const MemoryBehavior = require('../models/memory-behavior');

module.exports = (client) => {
  // should run only on unrecognized users
  const quietAction = (botNick, username) => {
    var exempt = false;
    if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
    if (exempt !== true) {
      console.log(client);
      // /mode #publiclab +q nick!*@*
      client.client.send('/mode #publiclab +q ' + username + '!*@*'); // attempting here
    }
  };

  return new MemoryBehavior('join', quietAction);
};
