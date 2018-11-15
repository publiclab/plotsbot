const MemoryBehavior = require('../models/memory-behavior');

module.exports = (client) => {
  // should run only on unrecognized users
  const voiceAction = (botNick, username) => {
    var matrix = false;
    if (username.match(/\[m\]/) !== null) matrix = true; // exempt matrix user
    if (matrix) {
      //client.client.send('PRIVMSG', 'ChanServ', "");
      client.client.send('MODE', '#publiclab', '+v', username);
    } else {
      // send a quiet command: /mode #publiclab +q nick!*@*
      client.client.send('MODE', '#publiclab', '+q', username + '!*@*');
      client.client.send('PRIVMSG', username, 'Welcome; because we have had some spam attacks, folks joining via IRC need to type "/msg plotsbot approve me" approved to chat. We are really sorry for the inconvenience but the spam got really awful!');
    }
  };

  return new MemoryBehavior('join', voiceAction);
};
