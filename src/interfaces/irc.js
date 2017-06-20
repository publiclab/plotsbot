const irc = require('irc');

class IrcClient {
  constructor(server, nick, channels) {
    this.client = new irc.Client(server, nick, {channels});
  }

  addJoinHandler(actions) {
    this.client.addListener('join', (channel, nick) => {
      actions(channel, nick);
    });
  }

  sendMessage(channel, message) {
    this.client.say(channel, message);
  }

  addMessageHandler(actions) {
    this.client.addListener('message', (from, to, message) => {
      actions(from, to, message);
    });
  }
}

module.exports = IrcClient;
