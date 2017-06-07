const config = require('./config');

const Chatbot = require('./services/chatbot');

let client;

if (process.env.TEST) {
  const CliClient = require('./interfaces/cli');
  client = new CliClient(config.name);
  console.log('Bot is running in testing mode.');
  console.log(`[${process.env.USER} => ${config.name}]`);
} else {
  const IrcClient = require('./interfaces/irc');
  client = new IrcClient(config.server, config.name, config.channels);
}

const chatbot = new Chatbot(config.name, client);

chatbot.addListeners();
