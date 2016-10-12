import canUseDOM from '../util/inDOM';

let transform = 'transform'
let prefix, transitionEnd;
let transitionTiming, transitionDuration
let transitionProperty, transitionDelay;

if (canUseDOM) {
  ({ prefix, transitionEnd } = getTransitionProperties());

  transform = `${prefix}-${transform}`
  transitionProperty = `${prefix}-transition-property`
  transitionDuration = `${prefix}-transition-duration`
  transitionDelay    = `${prefix}-transition-delay`
  transitionTiming   = `${prefix}-transition-timing-function`
}

export {
  transform,
  transitionProperty,
  transitionTiming,
  transitionDelay,
  transitionDuration,
  transitionEnd,
}

export default {
  transform,
  end:      transitionEnd,
  property: transitionProperty,
  timing:   transitionTiming,
  delay:    transitionDelay,
  duration: transitionDuration
}


function getTransitionProperties() {
  let transitionEnd
  let prefix = ''
  let eventNames = {
    O:      'otransitionend',
    Moz:    'transitionend',
    Webkit: 'webkitTransitionEnd',
    ms:     'MSTransitionEnd'
  };

  let element = document.createElement('div')
  for (let vendor in eventNames) if (eventNames.hasOwnProperty(vendor))
  {
    if (element.style[`${vendor}TransitionProperty`] !== undefined) {
      prefix = `-${vendor.toLowerCase()}`
      transitionEnd = eventNames[vendor];
      break
    }
  }

  if (!transitionEnd && element.style.transitionProperty !== undefined)
    transitionEnd = 'transitionend'

  element = null;

  return { transitionEnd, prefix }
}
