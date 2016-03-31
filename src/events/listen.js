var canUseDOM = require('../util/inDOM')
var on = require('./on')
var off = require('./off')

var listen = () => {}

if (canUseDOM) {
  listen = function(node, eventName, handler, capture) {
    var eventHandler = on(node, eventName, handler, capture);
    return function() {
      off(node, eventName, handler, capture);
    }
  }
}

module.exports = listen
