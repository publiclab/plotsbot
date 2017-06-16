const Chatbot = require('../services/chatbot');
const utils = require('../utils');

describe('Chatbot Service', () => {
  const chatbotName = 'testbot';
  const chatbot = new Chatbot(chatbotName);

  describe('Help Behavior', () => {
    it('should print general help', () => {
      expect(chatbot.getResponse(chatbotName, 'help')).toBe(utils.messageResponse(chatbotName, ['help']));
    });

    it('should print specific help for existing modules', () => {
      expect(chatbot.getResponse(chatbotName, 'help chatbot')).toBe(utils.messageResponse(chatbotName, ['help', 'chatbot']));
    });

    it('should print specific help for nonexisting modules', () => {
      expect(chatbot.getResponse(chatbotName, 'help kappa')).toBe(utils.messageResponse(chatbotName, ['help', 'kappa']));
    });

    it('should print specific help for existing and nonexisting modules combined', () => {
      expect(chatbot.getResponse(chatbotName, 'help kappa chatbot')).toBe(utils.messageResponse(chatbotName, ['help', 'kappa', 'chatbot']));
    });
  });
});
