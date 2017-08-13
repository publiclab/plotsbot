const utils = require('../src/utils');

describe('Chatbot Actions', () => {
  it('show use exec function properly', (done) => {
    utils.exec('echo ping').then((result) => {
      expect(result).toBe('ping\n');
      done();
    }).catch(() => {
      done.fail('Exec failed.');
    });
  });
});
