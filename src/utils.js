function contains(array, element) {
  return array.indexOf(element) == -1 ? false : true;
}

function remove(array, element) {
  array.splice(array.indexOf(element), 1);
}

module.exports = {
  contains,
  remove
};
