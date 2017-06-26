const Behaviors = require('../src/behaviors');
const helpMessage = require('../src/behaviors/help').helpMessage;

describe('Help Behavior', () => {
  const botNick = 'testbot';
  const behaviors = new Behaviors(botNick, undefined);

  const chatbotHelp = helpMessage(botNick, 'chatbot');
  const invalidHelp = helpMessage(botNick, 'invalid');

  it('should print general help', () => {
    behaviors.getResponse(botNick, 'help').then(response => {
      expect(response).toBe(chatbotHelp);
    });
  });

  it('should print specific help for existing modules', () => {
    behaviors.getResponse(botNick, 'help chatbot').then(response => {
      expect(response).toBe(chatbotHelp);
    });
  });

  it('should print specific help for nonexisting modules', () => {
    behaviors.getResponse(botNick, 'help invalid').then(response => {
      expect(response).toBe(invalidHelp);
    });
  });

  it('should print specific help for existing and nonexisting modules combined', () => {
    behaviors.getResponse(botNick, 'help chatbot invalid').then(response => {
      expect(response).toBe(chatbotHelp + '\n\n' + invalidHelp);
    });
  });
});
