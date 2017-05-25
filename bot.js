const irc = require('irc');

const config = require('./config');

const bot = new irc.Client(config.server, config.name, {
  channels: config.channels
});

bot.addListener('join', (channel, who) => {
  bot.say(channel, `Welcome to Publiclab, ${who}!`);
});
