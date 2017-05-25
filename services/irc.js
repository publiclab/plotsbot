const irc = require('irc');

module.exports = {
  newBot: (server, name, channels) => {
    return new irc.Client(server, name, { channels });
  },
  addJoinHandler: (bot, actions) => {
    bot.addListener('join', (channel, username) => {
      actions(bot, channel, username);
    });
  },
}
