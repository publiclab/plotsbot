const utils = require('../utils');

const greetBehavior = require('./greet');
const helpBehavior = require('./help').helpBehavior;

function parseMessage (message) {
  return message.split(/[\s,.;:!?]/g).filter(String);
}

function messageResponse(botNick, parsed, behaviors) {
  const behavior = behaviors.find(behavior =>
    utils.contains(parsed, behavior.keyword)
  );

  if (behavior) {
    utils.remove(parsed, behavior.keyword);
    return behavior.action(botNick, parsed);
  }
}

class Behaviors {
  constructor(botNick, client) {
    this.botNick = botNick;
    this.client = client;
    this.joinBehaviors = [ greetBehavior ];
    this.messageBehaviors = [ helpBehavior ];
  }

  addJoinHandler() {
    this.client.addJoinHandler((channel, username) => {
      this.joinBehaviors.forEach(behavior => {
        this.client.sendMessage(channel, behavior.action(channel, username, this.botNick));
      });
    });
  }

  addMessageHandler() {
    this.client.addMessageHandler((from, to, message) => {
      const response = this.getResponse(to, message);
      if(response) {
        if(to === this.botNick) {
          // Message was recieved in a DM
          this.client.sendMessage(from, response);
        } else {
          // Message was recieved in a normal channel
          this.client.sendMessage(to, response);
        }
      }
    });
  }

  getResponse(to, message) {
    let parsed = parseMessage(message);
    if(to === this.botNick) {
      // If the message was sent directly to the bot (eg: in a DM)
      return messageResponse(this.botNick, parsed, this.messageBehaviors);
    } else if (utils.contains(parsed, this.botNick)) {
      // If bot was mentioned
      utils.remove(parsed, this.botNick);
      return messageResponse(this.botNick, parsed, this.messageBehaviors);
    } else if (utils.contains(parsed, '@' + this.botNick)) {
      // If bot was mentioned, Gitter style
      utils.remove(parsed, '@' + this.botNick);
      return messageResponse(this.botNick, parsed, this.messageBehaviors);
    } else {
      // If the message was not meant for the bot
      return undefined;
    }
  }

  bootstrap() {
    this.addJoinHandler();
    this.addMessageHandler();
  }
}

module.exports = Behaviors;
