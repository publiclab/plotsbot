const jsonfile = require('jsonfile');

const Behaviors = require('./behaviors');

// Read file synchronously because we'd need this object in later steps anyway.
const config = jsonfile.readFileSync('config.json');

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

const behaviors = new Behaviors(config.name, client);
behaviors.bootstrap();
