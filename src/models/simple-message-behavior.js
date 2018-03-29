const Behavior = require('./behavior');

class SimpleMessageBehavior extends Behavior {
  constructor(keyword, response) {
    super('message', () => response, keyword);
  }
}

module.exports = SimpleMessageBehavior;
