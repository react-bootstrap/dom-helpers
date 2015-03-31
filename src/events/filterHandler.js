var contains = require('../query/contains')

module.exports = function(selector, handler) {
  return function(e){
    var top = e.currentTarget
      , target = e.target
      , matches = top.querySelectorAll(selector);

    if ([].some.call(matches, match => contains(match, target)))
      handler.call(this, e)
  }
}


