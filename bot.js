const config = require('./config');

const IrcClient = require('./services/irc');
const Chatbot = require('./services/chatbot');

const ircClient = new IrcClient(config.server, config.name, config.channels);
const chatbot = new Chatbot(ircClient);

chatbot.addListeners();
