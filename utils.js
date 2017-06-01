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

module.exports = {
  parseMessage,
  messageResponse
};
