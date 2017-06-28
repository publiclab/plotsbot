const Github = require('github');
const Behavior = require('../models/behavior');

const github = new Github();

const ftoAction = () => {
  github.issues.getForRepo({
    owner: 'publiclab',
    repo: 'plots2',
    labels: 'first-timers-only'
  }).then(data => {
    data.data.forEach(issue => {
      console.log(`${issue.number} => ${issue.title}`)
    });
  });
};

module.exports = new Behavior('message', ftoAction, 'fto');
