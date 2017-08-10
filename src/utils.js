const childProcess = require('child-process');

function contains(array, element) {
  return array.indexOf(element) == -1 ? false : true;
}

function remove(array, element) {
  array.splice(array.indexOf(element), 1);
}

function exec(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = {
  contains,
  remove,
  exec
};
