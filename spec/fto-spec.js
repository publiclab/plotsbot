const Behaviors = require('../src/behaviors');
const mockGithub = require('./test-utils').mockGithub;

const emptyResponse = 'You need to mention the name of a repository.';
const existingResponse = 'publiclab/existing\n1 => My first fake issue\n2 => My second fake issue';
const nonexistingReponse = 'publiclab/nonexisting is not a valid repository.';

describe('FTO Behavior', () => {
  const botNick = 'testbot';
  const ftoBehavior = require('../src/behaviors/fto')({ github: mockGithub });
  const behaviors = new Behaviors(botNick, undefined, [], [ftoBehavior]);

  it('should ask user to mention a repository', (done) => {
    behaviors.getResponse(botNick, 'fto').then(response => {
      expect(response).toBe(emptyResponse);
      done();
    });
  });

  it('should get existing repository', (done) => {
    behaviors.getResponse(botNick, 'fto existing').then(response => {
      expect(response).toBe(existingResponse);
      done();
    });
  });

  it('should get nonexisting repository', (done) => {
    behaviors.getResponse(botNick, 'fto nonexisting').then(response => {
      expect(response).toBe(nonexistingReponse);
      done();
    });
  });

  it('should get different combinations of repositories', (done) => {
    behaviors.getResponse(botNick, 'fto nonexisting existing nonexisting').then(response => {
      expect(response).toBe(`${nonexistingReponse}\n\n${existingResponse}\n\n${nonexistingReponse}`);
      done();
    });

    behaviors.getResponse(botNick, 'fto existing nonexisting existing').then(response => {
      expect(response).toBe(`${existingResponse}\n\n${nonexistingReponse}\n\n${existingResponse}`);
      done();
    });
  });

  it('should throw an error if something else went wrong', (done) => {
    behaviors.getResponse(botNick, 'fto out-of-this-world').then(() => {
      done.fail('Not throwing an error as needed');
    }).catch(() => {
      done();
    });
  });
});
