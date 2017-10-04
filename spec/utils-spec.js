const utils = require('../src/utils');

describe('Utils Tests', () => {
  it('should use contains function properly', () => {
    const fruits = ['apple', 'orange', 'banana'];

    expect(utils.contains(fruits, 'apple')).toBe(true);
    expect(utils.contains(fruits, 'melon')).toBe(false);
  });

  it('should use exec function successfully', (done) => {
    utils.exec('echo ping').then((result) => {
      expect(result.replace(/\s/g,'')).toBe('ping');
      done();
    });
  });

  it('should fail exec function gracefully', (done) => {
    utils.exec('exit 1').catch(() => {
      done();
    });
  });
});
