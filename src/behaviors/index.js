const utils = require('../utils');

function parseMessage (message) {
  return message.split(/[\s,.;:!?]/g).filter(String);
}

function messageResponse(botNick, parsed, behaviors) {
  return Promise.resolve().then(() => {
    // This function takes the parsed version of the message and the array of
    // behaviors with `trigger` equal to "message" (i.e. the behaviors supposed to
    // be triggered on message), executes the action of a behavior if it was
    // mentioned by `keyword` and returns the result

    // This snippet looks if the parsed message contains the keyword of any of the
    // behavior inside the behaviors array.
    const behavior = behaviors.find(behavior =>
      utils.contains(parsed, behavior.keyword)
    );

    // If there was a match, remove the behavior's keyword from the parsed message
    // call the behavior's action with the remaining message and the bot's nick
    if (behavior) {
      utils.remove(parsed, behavior.keyword);
      return behavior.action(botNick, parsed);
    }
  });
}

class Behaviors {
  constructor(botNick, client, joinBehaviors, messageBehaviors) {
    this.botNick = botNick;
    this.client = client;
    this.joinBehaviors = joinBehaviors;
    this.messageBehaviors = messageBehaviors;
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
      this.getResponse(to, message).then((response) => {
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
    });
  }

  getResponse(to, message) {
    return Promise.resolve().then(() => {
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
    });
  }

  bootstrap() {
    this.addJoinHandler();
    this.addMessageHandler();
  }
}

module.exports = Behaviors;
