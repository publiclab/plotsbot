class Chatbot {
  constructor (client) {
    this.client = client;
  }

  addListeners () {
    this.client.addJoinHandler((channel, nick) => {
      this.client.sendMessage(channel, `Welcome to Publiclab, ${nick}!`)
    });
  }
};

module.exports = Chatbot;
