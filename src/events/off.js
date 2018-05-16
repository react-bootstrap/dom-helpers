import canUseDOM from '../util/inDOM'

let offCache

let off = (node, eventName, handler, capture) => {
  if (!offCache) {
    if (canUseDOM) {
      if (document.addEventListener)
        offCache = (node, eventName, handler, capture) =>
          node.removeEventListener(eventName, handler, capture || false)

      else if (document.attachEvent)
        offCache = (node, eventName, handler) =>
          node.detachEvent('on' + eventName, handler)
    } else {
      offCache = () => {}
    }
  }

  return offCache(node, eventName, handler, capture)
}

export default off
