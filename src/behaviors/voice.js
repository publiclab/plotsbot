const MemoryBehavior = require('../models/memory-behavior');

module.exports = (client) => {
  // should run only on unrecognized users
  const voiceAction = (botNick, username) => {
    var matrix = false;
    if (username.match(/\[m\]/) !== null) matrix = true; // exempt matrix user
    if (matrix) {
      //client.client.send('PRIVMSG', 'ChanServ', "");
      client.client.send('MODE', '#publiclab', '+v', username);
      return 'Welcome, ' + username + ', thanks for joining us!';
    } else {
      // send a quiet command: /mode #publiclab +q nick!*@*
      client.client.send('MODE', '#publiclab', '+q', username + '!*@*');
      client.client.send('PRIVMSG', username, 'Welcome; because we have had some spam attacks, folks joining via IRC need to type "/msg plotsbot approve me" approved to chat. We are really sorry for the inconvenience but the spam got really awful!');
      client.client.send('PRIVMSG', username, 'You may not be able to hear messages from other platforms; until this is fixed, see https://publiclab.org/chat to use a different chat system; apologies!');
      return username + ' just joined via IRC; welcome! They may not hear messages via Riot/Matrix/Gitter/Slack (we are working on this problem).';
    }
  };

  return new MemoryBehavior('join', voiceAction);
};
