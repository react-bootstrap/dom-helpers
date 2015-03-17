var transition = require('./properties')
  , style = require('../style');

module.exports = function onEnd(node, handler, duration) {
  var fakeEvent = { 
        target:        node, 
        currentTarget: node 
      }
    , backup;

  if (!transition.end) 
    duration = 0

  else if ( duration == null )
    duration = style(node, transition.duration) || 0

  if (transition.end) {
    node.addEventListener(transition.end, done, false);

    backup = setTimeout(() => done(fakeEvent)
      , (duration || 100) * 1.5)
  } 
  else
    setTimeout(done.bind(null, fakeEvent), 0)

  function done(event) {
    if (event.target !== event.currentTarget) return
    clearTimeout(backup)
    event.target.removeEventListener(transition.end, done);
    handler.call(this)
  }
}
