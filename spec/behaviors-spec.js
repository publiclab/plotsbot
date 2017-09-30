const Behaviors = require('../src/behaviors');
const Behavior = require('../src/models/behavior');

function speakAction(botNick, options) {
  return options.join(' ');
}

const speakBehavior = new Behavior('message', speakAction, 'speak');

describe('Behaviors Spec', () => {
  const botNick = 'testbot';
  const behaviors = new Behaviors(botNick, undefined, [], [speakBehavior]);

  // it('should not return anything if no behavior matches', (done) => {
  //   behaviors.getResponse(botNick, 'kappa').then(response => {
  //     expect(response).toBe(undefined);
  //     done();
  //   });
  // });

  it('should recognize itself correctly in IRC', (done) => {
    behaviors.getResponse('#publiclab', 'testbot, speak hello').then((response) => {
      expect(response).toBe('hello');
      done();
    });
  });

  it('should recognize itself correctly on Gitter', (done) => {
    behaviors.getResponse('#publiclab', '@testbot speak hello').then((response) => {
      expect(response).toBe('hello');
      done();
    });
  });

  it('should not respond if it is not mentioned', (done) => {
    behaviors.getResponse('#publiclab', 'Hi Charlie!').then((response) => {
      expect(response).toBe(undefined);
      done();
    });
  });
});
