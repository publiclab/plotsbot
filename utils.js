function helpMessage (name, service) {
  let out = `# ${service}\n`;

  switch (service) {
  case 'chatbot':
    out += `\`${name} help [<module>...]\`: Prints out this descriptive help \
message for each mentioned module. If no modules are specified, print the help \
message for ALL modules.`;
    break;
  default:
    out += `\`${service}\` is not the name of a valid module. Try looking up \
the \`chatbot\` module instead.`;
  }

  return out;
}

function printGeneralHelp (name) {
  return helpMessage(name, 'chatbot');
}

function printSpecificHelp (name, message) {
  return message.map((service) => helpMessage(name, service)).join('\n\n');
}

function parseMessage (message) {
  return message.split(/[\s,.;:!?]/g).filter(String);
}

function messageResponse (name, message) {
  switch (message[0]) {
  case 'help':
    message.splice(0, 1);

    if (message.length === 0) {
      return printGeneralHelp(name);
    } else {
      return printSpecificHelp(name, message);
    }
  }
}

function contains(array, element) {
  return array.indexOf(element) == -1 ? false : true;
}

function remove(array, element) {
  array.splice(array.indexOf(element), 1);
}

module.exports = {
  parseMessage,
  messageResponse,
  contains,
  remove
};
