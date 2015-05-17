'use strict';

var canUseDOM = require('./inDOM')

var vendors = ['', 'webkit', 'moz', 'o', 'ms']
  , cancel = 'clearTimeout'
  , raf    = fallback
  , compatRaf;
  
var getKey = (vendor, k) => 
  vendor + (!vendor  ? k :(k[0].toUpperCase() + k.substr(1))) + 'AnimationFrame'

if ( canUseDOM ) {
  vendors.some(vendor => {
    var rafKey = getKey(vendor, 'request')

    if ( rafKey in window ){
      cancel = getKey(vendor, 'cancel')
      return raf = cb => window[rafKey](cb)
    }
  })
}

/* https://github.com/component/raf */
var prev = new Date().getTime();

function fallback(fn) {
  var curr = new Date().getTime()
    , ms = Math.max(0, 16 - (curr - prev))
    , req = setTimeout(fn, ms)

  prev = curr;
  return req;
}

compatRaf = cb => raf(cb)
compatRaf.cancel = id => window[cancel](id)


module.exports = compatRaf



