const Behaviors = require('../src/behaviors');

const responseTime = 100;
const offsetTime = 100;
const standardResponse = 'Hi, looks like nobody\'s around just now. If you have a question, you can post it a https://publiclab.org/questions, or if you need help with a software issue, you can open an issue at https://github.com/publiclab/plots2/issues/new -- thanks!';

describe('Unresponsive Behavior', () => {
  const botNick = 'testbot';
  const unresponsiveBehavior = require('../src/behaviors/unresponsive')({ responseTime, offsetTime });
  const behaviors = new Behaviors(botNick, undefined, [], [unresponsiveBehavior]);

  it('should print the message if nobody responds for 10 ms', (done) => {
    behaviors.getResponse(botNick, 'hello').then(response => {
      expect(response).toBe(standardResponse);
      done();
    });
  });

  it('should respond to last message if consective messages appear', (done) => {
    behaviors.getResponse(botNick, 'hi').catch(() => {
      // Seems fine.
    });
    behaviors.getResponse(botNick, 'hello').then(response => {
      expect(response).toBe(standardResponse);
      done();
    });
  });

  it('should reject earlier messages if consecutive messages appear', (done) => {
    behaviors.getResponse(botNick, 'hi').catch(() => {
      done();
    });
    behaviors.getResponse(botNick, 'hello');
  });
});
