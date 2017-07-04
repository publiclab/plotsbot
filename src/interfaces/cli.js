const readline = require('readline');

class CliClient {
  constructor(nick) {
    this.nick = nick;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  addJoinHandler() {
    // Ain't nobody joinin' you on the terminal
  }

  sendMessage(channel, message) {
    console.log(message);
  }

  addMessageHandler(actions) {
    this.rl.on('line', (line) => {
      actions(process.env.USER, this.nick, line);
    });
  }
}

module.exports = CliClient;
