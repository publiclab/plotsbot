const Behaviors = require('../src/behaviors');

const responseTime = 100;
const offsetTime = 100;
const standardResponse = '';

describe('Unresponsive Behavior', () => {
  const botNick = 'testbot';
  const unresponsiveBehavior = require('../src/behaviors/unresponsive')({ responseTime, offsetTime });
  const behaviors = new Behaviors(botNick, undefined, [], [unresponsiveBehavior]);

  it('should not print any message if nobody responds for 10 ms', (done) => {
    behaviors.getResponse('user', botNick, 'hello').then(response => {
      expect(response).toBe(standardResponse);
      done();
    });
  });

  it('should respond to last message if consective messages appear', (done) => {
    behaviors.getResponse('user', botNick, 'hi').catch(() => {
      // Seems fine.
    });
    behaviors.getResponse('user', botNick, 'hello').then(response => {
      expect(response).toBe(standardResponse);
      done();
    });
  });

  it('should reject earlier messages if consecutive messages appear', (done) => {
    behaviors.getResponse('user', botNick, 'hi').catch(() => {
      done();
    });
    behaviors.getResponse('user', botNick, 'hello');
  });
});
