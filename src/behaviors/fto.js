const Behavior = require('../models/behavior');

module.exports = ({ github }) => {
  function ftoRepo(repo) {
    return github.issues.getForRepo({
      owner: 'publiclab',
      repo,
      labels: 'first-timers-only'
    }).then(data => {
      return data.data.reduce((acc, issue) => {
        return acc + `\n${issue.number} => ${issue.title}`;
      }, `publiclab/${repo}`);
    }).catch(err => {
      if (err.status === 'Not Found') {
        return `publiclab/${repo} is not a valid repository.`;
      } else {
        throw err;
      }
    });
  }

  const ftoAction = (botNick, options) => {
    if (options.length > 0) {
      return Promise.all(options.map(ftoRepo)).then(repos => repos.join('\n\n'));
    } else {
      return 'You need to mention the name of a repository.';
    }
  };

  return new Behavior('message', ftoAction, 'fto');
};
