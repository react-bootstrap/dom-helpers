'use strict';
var slice = Array.prototype.slice;

// Phantom js polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    var func = this;
    var args = slice.call(arguments, 1);

    function bound() {
      var invokedAsConstructor = func.prototype && (this instanceof func);
      return func.apply(
        !invokedAsConstructor && context || this,
        args.concat(slice.call(arguments))
      );
    }
    bound.prototype = func.prototype;
    return bound;
  };
}


global.expect = require('expect.js')


var testsContext = require.context('./test', true, /\.js$/);

testsContext.keys().forEach(testsContext);