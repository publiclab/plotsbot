const Behavior = require('./behavior');
const utils = require('../utils');

// TODO(@ryzokuken): Switch to a more persistent memory model later
// (Hint: Databases)
let memory = [];

class MemoryBehavior extends Behavior {
  constructor(trigger, action, keyword) {
    const newAction = (botNick, username, ...args) => {
      if (!utils.contains(memory, username)) {
        memory.push(username);
        action(botNick, username, ...args);
      }
    };
    super(trigger, newAction, keyword);
  }
}

module.exports = MemoryBehavior;
