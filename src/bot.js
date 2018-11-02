const fs = require('fs');
const Github = require('github');

const Behaviors = require('./behaviors');
const SimpleMessageBehavior = require('./models/simple-message-behavior');

const state = {
  github: new Github(),
  responseTime: 10 * 60 * 1000,
  offsetTime: 1000
};

const path = require('path');
// const greetBehavior = require('./behaviors/greet');
// const helpBehavior = require('./behaviors/help').helpBehavior;
const ftoBehavior = require('./behaviors/fto')(state);
const heatBehavior = require('./behaviors/heat');
const unresponsiveBehavior = require('./behaviors/unresponsive')(state);
const versionBehavior = require('./behaviors/version');
const quietBehavior = require('./behaviors/quiet');

// Read file synchronously because we'd need this object in later steps anyway.
const configFile = path.join(__dirname, '../', 'config.json');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

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

const joinBehaviors = [
  // greetBehavior, // using welcome message for now
  quietBehavior
];

const messageBehaviors = [
  // helpBehavior,
  new SimpleMessageBehavior('help', 'this is the help text'),
  ftoBehavior,
  heatBehavior,
  unresponsiveBehavior,
  versionBehavior
];

const behaviors = new Behaviors(config.name, client, joinBehaviors, messageBehaviors);
behaviors.bootstrap();

// Express server for `show` and `tell` actions

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  switch (req.query.action) {
  case 'tell':
    config.channels.forEach(channel => {
      client.sendMessage(
        channel,
        `${require('os').userInfo().username} tells: ${req.query.message}`
      );
    });
    res.sendStatus(200);
    break;
  default:
    res.sendStatus(400);
    break;
  }
});

app.listen(4000, 'localhost', () => {
  console.log('Plotsbot is listening on port 4000!');
});
