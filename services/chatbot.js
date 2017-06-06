const utils = require('../utils');

class Chatbot {
  constructor (nick, client) {
    this.nick = nick;
    this.client = client;
  }

  sendMessage (from, to, message) {
    if (to.charAt(0) === '#') {
      this.client.sendMessage(to, message);
    } else {
      this.client.sendMessage(from, message)
    }
  }

  addListeners () {
    this.client.addJoinHandler((channel, nick) => {
      this.client.sendMessage(channel, `Welcome to Publiclab, ${nick}! For a \
quick walkthrough, send the message: \`${this.nick} help\``);
    });

    this.client.addMessageHandler((from, to, message) => {
      const parsed = utils.parseMessage(message);

      if (parsed.indexOf(this.nick) != -1) {
        parsed.splice(parsed.indexOf(this.nick), 1);
        this.sendMessage(from, to, utils.messageResponse(this.nick, parsed));
      } else if (parsed.indexOf('@' + this.nick) != -1) {
        parsed.splice(parsed.indexOf('@' + this.nick), 1);
        this.sendMessage(from, to, utils.messageResponse(this.nick, parsed));
      } else if (to === this.nick) {
        this.sendMessage(from, to, utils.messageResponse(this.nick, parsed));
      }
    });
  }
};

module.exports = Chatbot;
