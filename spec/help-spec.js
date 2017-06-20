const Behaviors = require('../src/behaviors');
const helpMessage = require('../src/behaviors/help').helpMessage;

describe('Help Behavior', () => {
  const botNick = 'testbot';
  const behaviors = new Behaviors(botNick, undefined);

  const chatbotHelp = helpMessage(botNick, 'chatbot');
  const invalidHelp = helpMessage(botNick, 'invalid');

  it('should print general help', () => {
    expect(behaviors.getResponse(botNick, 'help')).toBe(chatbotHelp);
  });

  it('should print specific help for existing modules', () => {
    expect(behaviors.getResponse(botNick, 'help chatbot')).toBe(chatbotHelp);
  });

  it('should print specific help for nonexisting modules', () => {
    expect(behaviors.getResponse(botNick, 'help invalid')).toBe(invalidHelp);
  });

  it('should print specific help for existing and nonexisting modules combined', () => {
    expect(behaviors.getResponse(botNick, 'help chatbot invalid')).toBe(chatbotHelp + '\n\n' + invalidHelp);
  });
});
