'use strict';
var style  = require('./style')
  , events = require('./events')
  , query  = require('./query')
  , activeElement = require('./activeElement')
  , ownerDocument = require('./ownerDocument')
  , ownerWindow = require('./ownerWindow')

module.exports = {

  ...style,
  ...events,
  ...query,

  activeElement,
  ownerDocument,
  ownerWindow,

  requestAnimationFrame: require('./util/requestAnimationFrame')
}
