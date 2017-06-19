const Behavior = require('../models/behavior');

function helpMessage (name, service) {
  let out = `# ${service}\n`;

  switch (service) {
  case 'chatbot':
    out += `\`${name} help [<module>...]\`: Prints out this descriptive help message for each mentioned module. If no modules are specified, print the help message for ALL modules.`;
    break;
  default:
    out += `\`${service}\` is not the name of a valid module. Try looking up the \`chatbot\` module instead.`;
  }

  return out;
}

function printGeneralHelp (botNick) {
  return helpMessage(botNick, 'chatbot');
}

function printSpecificHelp (botNick, options) {
  return options.map((service) => helpMessage(botNick, service)).join('\n\n');
}

let helpAction = (botNick, options) => {
  if(options.length == 0) {
    return printGeneralHelp(botNick);
  } else {
    return printSpecificHelp(botNick, options);
  }
};

module.exports = new Behavior('message', helpAction, 'help');
