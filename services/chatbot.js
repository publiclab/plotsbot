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
      this.client.sendMessage(from, message);
    }
  }

  addListeners () {
    this.client.addJoinHandler((channel, nick) => {
      this.sendMessage(this.nick, channel, `Welcome to Publiclab, ${nick}! For a \
quick walkthrough, send the message: \`${this.nick} help\``);
    });

    this.client.addMessageHandler((from, to, message) => {
      const response = this.getResponse(to, message);
      if (response) {
        // Only respond if there is an appropriate response
        this.sendMessage(from, to, response);
      }
    });
  }

  getResponse (to, message) {
    let parsed = utils.parseMessage(message);

    if (parsed.indexOf(this.nick) != -1) {
      // If bot was mentioned
      parsed.splice(parsed.indexOf(this.nick), 1);
      return utils.messageResponse(this.nick, parsed);
    } else if (parsed.indexOf('@' + this.nick) != -1) {
      // If bot was mentioned, Gitter style
      parsed.splice(parsed.indexOf('@' + this.nick), 1);
      return utils.messageResponse(this.nick, parsed);
    } else if (to === this.nick) {
      // If the message was sent directly to the bot (eg: in a DM)
      return utils.messageResponse(this.nick, parsed);
    } else {
      // If the message was not meant for the bot
      return undefined;
    }
  }
}

module.exports = Chatbot;
