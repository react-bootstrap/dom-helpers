'use strict';
var style  = require('./style')
  , events = require('./events')
  , query  = require('./query')

module.exports = {

  ...style, 
  ...events, 
  ...query,

  requestAnimationFrame: require('./util/requestAnimationFrame')
}