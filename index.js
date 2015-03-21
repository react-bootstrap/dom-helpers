"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var style = require("./style"),
    events = require("./events"),
    query = require("./query");

module.exports = babelHelpers._extends({}, style, events, query, {

  requestAnimationFrame: require("./util/requestAnimationFrame")
});