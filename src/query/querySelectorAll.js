'use strict';
//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
var simpleSelectorRE = /^[\w-]*$/;

module.exports = function qsa(element, selector) {
  var maybeID    = selector[0] === '#'
    , maybeClass = selector[0] === '.'
    , nameOnly   = (maybeID || maybeClass) ? selector.slice(1) : selector
    , isSimple   = simpleSelectorRE.test(nameOnly)
    , found;

  if ( isSimple ) {
    if (element.getElementById && maybeID)
      return (found = element.getElementById(nameOnly)) ? [ found ] : []

    if ( element.getElementsByClassName && maybeClass)
      return [].slice.call(element.getElementsByClassName(nameOnly))

    return [].slice.call(element.getElementsByTagName(selector))
  }

  return [].slice.call(element.querySelectorAll(selector))
}