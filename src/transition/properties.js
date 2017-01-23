import canUseDOM from '../util/inDOM';

let transform = 'transform'
let prefix, transitionEnd, animationEnd;
let transitionProperty, transitionDuration, transitionTiming, transitionDelay;
let animationName, animationDuration, animationTiming, animationDelay;

if (canUseDOM) {
  ({ prefix, transitionEnd, animationEnd } = getTransitionProperties());

  transform = `${prefix}-${transform}`
  transitionProperty = `${prefix}-transition-property`
  transitionDuration = `${prefix}-transition-duration`
  transitionDelay    = `${prefix}-transition-delay`
  transitionTiming   = `${prefix}-transition-timing-function`

  animationName     = `${prefix}-animation-name`
  animationDuration = `${prefix}-animation-duration`
  animationTiming   = `${prefix}-animation-delay`
  animationDelay    = `${prefix}-animation-timing-function`
}

export {
  transform,
  transitionProperty,
  transitionTiming,
  transitionDelay,
  transitionDuration,
  transitionEnd,

  animationName,
  animationDuration,
  animationTiming,
  animationDelay,
  animationEnd,
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
  let style = document.createElement('div').style

  let vendorMap = {
    O: e => `o${e.toLowerCase()}`,
    Moz: e => `moz${e}`,
    Webkit: e => `webkit${e}`,
    ms: e => `MS${e}`,
  };

  let vendors = Object.keys(vendorMap);

  let transitionEnd, animationEnd;
  let prefix = ''

  for (let i = 0; i < vendors.length; i++) {
    let vendor = vendors[i];

    if (`${vendor}TransitionProperty` in style) {
      prefix = `-${vendor.toLowerCase()}`
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd || 'transitionProperty' in style)
    transitionEnd = 'transitionend'

  if (!animationEnd || 'animationName' in style)
    transitionEnd = 'animationend'

  style = null;

  return { animationEnd, transitionEnd, prefix }
}
