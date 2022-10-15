const Behavior = require('../models/behavior');

module.exports = ({ github }) => {
  function ftoRepo(repo) {
    return github.issues.getForRepo({
      owner: 'publiclab',
      repo,
      labels: 'first-timers-only'
    }).then(data => {
      return data.data.reduce((acc, issue) => {
        return acc + `\n${issue.number} => ${issue.title} [${issue.html_url}]`;
      }, `publiclab/${repo}`);
    }).catch(err => {
      if (err.status === 'Not Found') {
        return `publiclab/${repo} is not a valid repository.`;
      } else {
        throw err;
      }
    });
  }

  const ftoAction = (botNick, frm, options) => {
    if (options.length > 0) {
      return Promise.all(options.map(ftoRepo)).then(repos => repos.join('\n\n'));
    } else {
      let answer = 'You need to mention the name of a repository.';

      // github.repos.getForOrg({org: 'publiclab',})
      //   .then(data=>{
      //     let names = '';
      //     data.data.map(repo=>{
      //       if (repo.visibility === 'public' && repo.has_issues) {
      //         names += repo.name
      //         // Promise.all(repo.map(ftoRepo)).then(repo => console.log('repo', repo));
      //         answer += `\n${repo.name}: ${repo.description}`;
      //       }
      //     })
      // }).catch(err => {
      //   console.log(err)
      // });
      return answer;
    }
  };

  return new Behavior('message', ftoAction, 'fto');
};
