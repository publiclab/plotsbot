const config = require('./config');

const IrcClient = require('./services/irc');

const ircClient = new IrcClient(config.server, config.name, config.channels);

ircClient.addJoinHandler((channel, nick) => {
  ircClient.sendMessage(channel, `Welcome to Publiclab, ${nick}!`)
});
