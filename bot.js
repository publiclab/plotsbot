const config = require('./config');

const ircService = require('./services/irc');

const bot = ircService.newBot(config.server, config.name, config.channels);

ircService.addJoinHandler(bot, (bot, channel, username) => {
  bot.say(channel, `Welcome to Publiclab, ${username}!`);
});
