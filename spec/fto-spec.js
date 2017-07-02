const Behaviors = require('../src/behaviors');

const existingResponse = 'publiclab/existing\n1 => My first fake issue\n2 => My second fake issue';
const nonexistingReponse = 'publiclab/nonexisting is not a valid repository.';

const mockGithub = {
  issues: {
    getForRepo: ({ repo }) => {
      return new Promise((resolve, reject) => {
        if (repo == 'existing') {
          resolve({
            data: [{
              number: 1,
              title: 'My first fake issue'
            }, {
              number: 2,
              title: 'My second fake issue'
            }]
          });
        } else {
          let err = new Error();
          err.status = 'Not Found';
          reject(err);
        }
      });
    }
  }
};

describe('FTO Behavior', () => {
  const botNick = 'testbot';
  const ftoBehavior = require('../src/behaviors/fto')({ github: mockGithub });
  const behaviors = new Behaviors(botNick, undefined, [], [ftoBehavior]);

  // console.log(mockGithub.issues.getForRepo('publiclab', 'existing', 'first-timers-only'));

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
});
