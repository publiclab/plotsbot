const Behaviors = require('../src/behaviors');

describe('Version Behavior', () => {
  const botNick = 'testbot';
  const versionBehavior = require('../src/behaviors/version');
  const behaviors = new Behaviors(botNick, undefined, [], [versionBehavior]);

  const versionResponse = `testbot is running package ${process.env.npm_package_name} at version ${process.env.npm_package_version}`;

  it('should print information correctly', (done) => {
    behaviors.getResponse(botNick, 'version').then(response => {
      expect(response).toBe(versionResponse);
      done();
    });
  });
});
