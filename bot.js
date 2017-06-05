const config = require('./config');

const IrcClient = require('./interfaces/irc');
const Chatbot = require('./services/chatbot');

const ircClient = new IrcClient(config.server, config.name, config.channels);
const chatbot = new Chatbot(config.name, ircClient);

chatbot.addListeners();
