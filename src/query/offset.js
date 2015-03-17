'use strict';
var contains = require('./contains')
  , getWindow = require('./isWindow')

module.exports = function offset(node) {
  var doc     = node.ownerDocument
    , docElem = doc && doc.documentElement
    , box     = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return

  if (!contains(docElem, node))
    return box

  if (node.getBoundingClientRect !== undefined)
    box = node.getBoundingClientRect();

  var win = getWindow(doc);

  return {
    top:    box.top  + (win.pageYOffset || docElem.scrollTop)  - (docElem.clientTop  || 0),
    left:   box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
    width:  box.width  || node.offsetWidth,
    height: box.height || node.offsetHeight
  };
}