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

module.exports = {
  mockGithub
};
