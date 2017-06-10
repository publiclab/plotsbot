const utils = require('../utils');

describe('Chatbot Service', () => {
  describe('Help Behavior', () => {
    it('prints general help correctly', () => {
      expect(utils.messageResponse('plotsbot', ['help'])).toBe(utils.printGeneralHelp('plotsbot'));
    });

    it('prints specific help correctly for existent module', () => {
      expect(utils.messageResponse('plotsbot', ['help', 'chatbot'])).toBe(utils.printSpecificHelp('plotsbot', ['chatbot']));
    });

    it('prints specific help correctly for nonexistent module', () => {
      expect(utils.messageResponse('plotsbot', ['help', 'idontexist'])).toBe(utils.printSpecificHelp('plotsbot', ['idontexist']));
    });
  });
});
