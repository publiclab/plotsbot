const MemoryBehavior = require('../models/memory-behavior');

// Read file synchronously because we'd need this object in later steps anyway.
const configFile = path.join(__dirname, '../', 'config.json');

const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
 
let client;

// should run only on unrecognized users
const quietAction = (botNick, username) => {
  const IrcClient = require('./interfaces/irc');
  client = new IrcClient(config.server, config.name, config.channels);
  var exempt = false;
  if (username.match(/\[m\]/) !== null) exempt = true; // exempt matrix user
  if (exempt !== true) {
    client.client.send('quiet', '#publiclab', username); // attempting here
    // return `/quiet ${username}`; // this didn't work, it just "spoke" it
  }
};

module.exports = new MemoryBehavior('join', quietAction);
