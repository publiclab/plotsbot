function helpMessage (name, service) {
  let out = `## ${service}\n`;

  switch (service) {
    case 'chatbot':
      out += `\`${name} help [<module>...]\`: Prints out this descriptive help \
message for each mentioned module. If no modules are specified, print the help \
message for ALL modules.`;
    default:
      out += `\`${service}\` is not the name of a valid module. Try looking up \
the \`chatbot\` module instead.`
  }

  return out + '\n\n';
}

function printGeneralHelp (name) {
  return helpMessage(name, 'chatbot');
}

function printSpecificHelp (name, message) {
  let out = '';
  message.forEach((service) => {
    out += helpMessage(name, service);
  });
  return out;
}

function parseMessage (message) {
  return message.split(/[\s,.;:!?]/g).filter(String);
}

function messageResponse (name, message) {
  console.log('Bot was mentioned!');

  switch (message[0]) {
    case 'help':
      message.splice(0, 1);
      console.log(message);

      if (message.length === 0) {
        return printGeneralHelp(name);
      } else {
        return printSpecificHelp(name, message);
      }
  }
}

class Chatbot {
  constructor (nick, client) {
    this.nick = nick;
    this.client = client;
  }

  sendMessage (from, to, message) {
    if (to.charAt(0) === '#') {
      this.client.sendMessage(to, message);
    } else {
      this.client.sendMessage(from, message)
    }
  }

  addListeners () {
    this.client.addJoinHandler((channel, nick) => {
      this.client.sendMessage(channel, `Welcome to Publiclab, ${nick}!`)
    });

    this.client.addMessageHandler((from, to, message) => {
      // console.log(`${from} => ${to}: ${message}`);
      const parsed = parseMessage(message);

      if (parsed.indexOf(this.nick) != -1) {
        parsed.splice(parsed.indexOf(this.nick), 1);
        this.sendMessage(from, to, messageResponse(this.nick, parsed));
      } else if (parsed.indexOf('@' + this.nick) != -1) {
        parsed.splice(parsed.indexOf('@' + this.nick), 1);
        this.sendMessage(from, to, messageResponse(this.nick, parsed));
      } else if (to === this.nick) {
        this.sendMessage(from, to, messageResponse(this.nick, parsed));
      }
    });
  }
};

module.exports = Chatbot;
