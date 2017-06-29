const Github = require('github');
const Behavior = require('../models/behavior');

const github = new Github();

const ftoAction = () => {
  return github.issues.getForRepo({
    owner: 'publiclab',
    repo: 'plots2',
    labels: 'first-timers-only'
  }).then(data => {
    return data.data.reduce((acc, issue) => {
      return acc + `\n${issue.number} => ${issue.title}`;
    }, '');
  });
};

module.exports = new Behavior('message', ftoAction, 'fto');
