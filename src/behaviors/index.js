const utils = require('../utils');

function parseMessage (message) {
  return message.split(/[\s,.;:!?]/g).filter(String);
}

function messageResponse(frm, botNick, parsed, keywordBehaviors, fallbackBehaviors) {
  return Promise.resolve().then(() => {
    // This function takes the parsed version of the message and the array of
    // behaviors with `trigger` equal to "message" (i.e. the behaviors supposed to
    // be triggered on message), executes the action of a behavior if it was
    // mentioned by `keyword` and returns the result

    // This snippet looks if the parsed message contains the keyword of any of the
    // behavior inside the keywordBehaviors array
    const behavior = keywordBehaviors.find(behavior =>
      utils.contains(parsed, behavior.keyword)
    );

    // If there was a match, remove the behavior's keyword from the parsed message
    // call the behavior's action with the remaining message and the bot's nick
    // otherwise, it calls all fallback behaviors and channels their output instead
    if (behavior) {
      utils.remove(parsed, behavior.keyword);
      return behavior.action(botNick, frm, parsed);
    } else {
      return fallbackResponse(botNick, frm, parsed, fallbackBehaviors);
    }
  });
}

function fallbackResponse(frm, botNick, parsed, fallbackBehaviors) {
  return Promise.all(fallbackBehaviors.map(behavior => behavior.action(botNick, frm, parsed)))
    .then(outputs => outputs.join('\n'));
}

class Behaviors {
  constructor(botNick, client, joinBehaviors, messageBehaviors) {
    this.botNick = botNick;
    this.client = client;
    this.joinBehaviors = joinBehaviors;

    // These are the message behaviors that have a certain keyword trigger
    this.keywordMessageBehaviors = [];
    // These are message behaviors that do not have a definite trigger keyword,
    // they are triggered whenever no certain keyword is mentioned
    this.fallbackMessageBehaviors = [];
    messageBehaviors.forEach((behavior) => {
      // If `behavior.keyword` is not a false-y value (`undefined` in our case)
      if (behavior.keyword) {
        this.keywordMessageBehaviors.push(behavior);
      } else {
        this.fallbackMessageBehaviors.push(behavior);
      }
    });
  }

  addJoinHandler() {
    this.client.addJoinHandler((channel, username) => {
      this.joinBehaviors.forEach(behavior => {
        this.client.sendMessage(channel, behavior.action(this.botNick, username, channel));
      });
    });
  }

  addMessageHandler() {
    this.client.addMessageHandler((frm, to, message) => {
      this.getResponse(frm, to, message).then((response) => {
        if(response) {
          if(to === this.botNick) {
            // Message was received in a DM
            this.client.sendMessage(frm, response);
          } else {
            // Message was received in a normal channel
            this.client.sendMessage(to, response);
          }
        }
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  getResponse(frm, to, message) {
    return Promise.resolve().then(() => {
      let parsed = parseMessage(message);
      if(to === this.botNick) {
        // If the message was sent directly to the bot (eg: in a DM)
        return messageResponse(frm, this.botNick, parsed, this.keywordMessageBehaviors, this.fallbackMessageBehaviors);
      } else if (utils.contains(parsed, this.botNick)) {
        // If bot was mentioned
        utils.remove(parsed, this.botNick);
        return messageResponse(frm, this.botNick, parsed, this.keywordMessageBehaviors, this.fallbackMessageBehaviors);
      } else if (utils.contains(parsed, '@' + this.botNick)) {
        // If bot was mentioned, Gitter style
        utils.remove(parsed, '@' + this.botNick);
        return messageResponse(frm, this.botNick, parsed, this.keywordMessageBehaviors, this.fallbackMessageBehaviors);
      } else {
        return fallbackResponse(frm, this.botNick, parsed, this.fallbackMessageBehaviors);
      }
    });
  }

  bootstrap() {
    this.addJoinHandler();
    this.addMessageHandler();
  }
}

module.exports = Behaviors;
