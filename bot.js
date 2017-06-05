const config = require('./config');

const Chatbot = require('./services/chatbot');

if (process.env.TEST) {
  const CliClient = require('./interfaces/cli');
  var client = new CliClient(config.name);
  console.log('Bot is running in testing mode.');
} else {
  const IrcClient = require('./interfaces/irc');
  var client = new IrcClient(config.server, config.name, config.channels);
}

const chatbot = new Chatbot(config.name, client);

chatbot.addListeners();
