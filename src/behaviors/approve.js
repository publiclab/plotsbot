const Behavior = require('../models/behavior');
const utils = require('../utils');

module.exports = (client) => {

  const approveAction = (botNick, username) => {
    // send an unquiet command: /mode #publiclab +e nick
    client.client.send('MODE', '#publiclab', '+e', username);
    return "Welcome, " + username + ", sorry for the trouble!";
  };

  return new Behavior('message', approveAction, 'approve');
};
