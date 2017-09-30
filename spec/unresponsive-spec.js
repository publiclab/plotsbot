const Behaviors = require('../src/behaviors');

const standardResponse = 'Hi, looks like nobody\'s around just now. If you have a question, you can post it a https://publiclab.org/questions, or if you need help with a software issue, you can open an issue at https://github.com/publiclab/plots2/issues/new -- thanks!';

describe('Unresponsive Behavior', () => {
  const botNick = 'testbot';
  const unresponsiveBehavior = require('../src/behaviors/unresponsive')(1000);
  const behaviors = new Behaviors(botNick, undefined, [], [unresponsiveBehavior]);

  it('should print out the help message', (done) => {
    behaviors.getResponse(botNick, 'hello').then(response => {
      expect(response).toBe(standardResponse);
      done();
    });
  });
});
