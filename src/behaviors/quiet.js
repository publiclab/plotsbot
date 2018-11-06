const MemoryBehavior = require('../models/memory-behavior');

module.exports = (client) => {
  // should run only on unrecognized users
  const quietAction = (botNick, username) => {
    var exempt = false;
    if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
    if (exempt !== true) {
      // send a quiet command: /mode #publiclab +q nick!*@*
      client.client.send('MODE', '#publiclab', '+q', username + '!*@*');
      client.client.send('MSG', username, "Welcome; because we've had some spam attacks, folks joining via IRC need to visit https://publiclab.org/chat#IRC to get approved to chat. We're really sorry for the inconvenience but the spam got really awful!");
    }
  };

  return new MemoryBehavior('join', quietAction);
};
