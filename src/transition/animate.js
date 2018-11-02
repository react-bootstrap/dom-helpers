import hyphenate from '../util/hyphenate'
import css from '../style'
import on  from '../events/on'
import off from '../events/off'
import transitionProps from './properties'
import isTransform from './isTransform'

let reset = {}
reset[transitionProps.property] =
  reset[transitionProps.duration] =
  reset[transitionProps.delay]    =
  reset[transitionProps.timing]   = ''


// super lean animate function for transitions
// doesn't support all translations to keep it matching the jquery API
/**
 * code in part from: Zepto 1.1.4 | zeptojs.com/license
 */
function _animate({ node, properties, duration = 200, easing, callback }) {
  let cssProperties = []
    , fakeEvent  = { target: node, currentTarget: node }
    , cssValues  = {}
    , transforms = ''
    , fired;

  if (!transitionProps.end)
    duration = 0

  Object.keys(properties).forEach(key => {
    if (isTransform(key))
      transforms += `${key}(${properties[key]}) `
    else {
      cssValues[key] = properties[key]
      cssProperties.push(hyphenate(key))
    }
  })

  if (transforms) {
    cssValues[transitionProps.transform] = transforms
    cssProperties.push(transitionProps.transform)
  }

  if (duration > 0) {
    cssValues[transitionProps.property] = cssProperties.join(', ')
    cssValues[transitionProps.duration] = `${duration / 1000  }s`
    cssValues[transitionProps.delay]    = `${0  }s`
    cssValues[transitionProps.timing]   = easing || 'linear'

    on(node, transitionProps.end, done)

    setTimeout(() => {
      if (!fired) done(fakeEvent)
    }, duration + 500)
  }

  // eslint-disable-next-line no-unused-expressions
  node.clientLeft // trigger page reflow

  css(node, cssValues)

  if (duration <= 0)
    setTimeout(done.bind(null, fakeEvent), 0)

  return {
    cancel() {
      if (fired) return
      fired = true
      off(node, transitionProps.end, done)
      css(node, reset)
    }
  }

  function done(event) {
    if (event.target !== event.currentTarget) return

    fired = true
    off(event.target, transitionProps.end, done)
    css(node, reset)
    callback && callback.call(this)
  }
}

function animate(node, properties, duration, easing, callback) {
  if (arguments.length === 1 && typeof node === 'object') {
    return _animate(node)
  }

  if (typeof easing === 'function') {
    callback = easing;
    easing = null;
  }

  return _animate({ node, properties, duration, easing, callback })
}

export default animate
