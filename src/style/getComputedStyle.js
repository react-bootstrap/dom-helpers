'use strict';

module.exports = function _getComputedStyle(node) {
  if( !node) throw new TypeError("No Element passed to `getComputedStyle()`")
  var doc = node.ownerDocument;

  return "defaultView" in doc 
    ? doc.defaultView.opener
      ? node.ownerDocument.defaultView.getComputedStyle( node, null )
      : window.getComputedStyle(node, null)
    : { //ie 8 "magic"
        getPropertyValue(prop) {
          var re = /(\-([a-z]){1})/g;
          if (prop == 'float') prop = 'styleFloat';
          if (re.test(prop))
            prop = prop.replace(re, (...args) => args[2].toUpperCase())
            
          return node.currentStyle[prop] || null;
        }
      }
}