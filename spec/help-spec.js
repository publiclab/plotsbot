const Behaviors = require('../src/behaviors');
const helpMessage = require('../src/behaviors/help').helpMessage;

describe('Help Behavior', () => {
  const botNick = 'testbot';
  const helpBehavior = require('../src/behaviors/help').helpBehavior;
  const behaviors = new Behaviors(botNick, undefined, [], [helpBehavior]);

  const chatbotHelp = helpMessage(botNick, 'chatbot');
  const invalidHelp = helpMessage(botNick, 'invalid');

  it('should print general help', (done) => {
    behaviors.getResponse('user', botNick, 'help').then(response => {
      expect(response).toBe(chatbotHelp);
      done();
    });
  });

  it('should print specific help for existing modules', (done) => {
    behaviors.getResponse('user', botNick, 'help chatbot').then(response => {
      expect(response).toBe(chatbotHelp);
      done();
    });
  });

  it('should print specific help for nonexisting modules', (done) => {
    behaviors.getResponse('user', botNick, 'help invalid').then(response => {
      expect(response).toBe(invalidHelp);
      done();
    });
  });

  it('should print specific help for existing and nonexisting modules combined', (done) => {
    behaviors.getResponse('user', botNick, 'help chatbot invalid').then(response => {
      expect(response).toBe(chatbotHelp + '\n\n' + invalidHelp);
      done();
    });
  });
});
