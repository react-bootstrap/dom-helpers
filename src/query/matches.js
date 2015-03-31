'use strict';
var canUseDOM = require('../util/inDOM')
  , matches;

if ( canUseDOM ) {
  var body = document.body
    , nativeMatch = body.matches 
                 || body.matchesSelector
                 || body.webkitMatchesSelector
                 || body.mozMatchesSelector
                 || body.msMatchesSelector;
  
  matches = nativeMatch 
    ? (node, selector) => nativeMatch.call(node, selector)
    : ie8MatchesSelector
}

module.exports = matches

function ie8MatchesSelector(node, selector) {
  var matches = (node.document || node.ownerDocument).querySelectorAll(selector)
    , i = 0;
  
  while (matches[i] && matches[i] !== node) i++;
  
  return !!matches[i];
}