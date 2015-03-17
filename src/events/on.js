'use strict';
var canUseDOM = require('../util/inDOM')
var on = ()=>{}

if (canUseDOM) {
  on = (function(){
 
    if (document.addEventListener)
      return (node, eventName, handler, capture) => 
          node.addEventListener(eventName, handler, capture || false);

    else if (document.attachEvent)
      return (node, eventName, handler) => 
          node.attachEvent('on' + eventName, handler);
  })();
}

module.exports = on
