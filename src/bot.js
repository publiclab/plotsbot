const fs = require('fs');
const Github = require('github');

const Behaviors = require('./behaviors');

const state = {
  github: new Github()
};

const greetBehavior = require('./behaviors/greet');
const helpBehavior = require('./behaviors/help').helpBehavior;
const ftoBehavior = require('./behaviors/fto')(state);
const heatBehavior = require('./behaviors/heat');

// Read file synchronously because we'd need this object in later steps anyway.
const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

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
  greetBehavior
];

const messageBehaviors = [
  helpBehavior,
  ftoBehavior,
  heatBehavior
];

const behaviors = new Behaviors(config.name, client, joinBehaviors, messageBehaviors);
behaviors.bootstrap();

// Express server for `show` and `tell` actions

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  switch (req.query.action) {
  case 'tell':
    config.channels.forEach((channel) => {
      client.sendMessage(channel, `${require('os').userInfo().username} tells: ${req.query.message}`);
    });
    res.sendStatus(200);
    break;
  default:
    res.sendStatus(400);
    break;
  }
});

app.listen(3000, 'localhost', () => {
  console.log('Plotsbot is listening on port 3000!');
});
