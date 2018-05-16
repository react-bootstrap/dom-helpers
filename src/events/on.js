import canUseDOM from '../util/inDOM'

let onCache

let on = (node, eventName, handler, capture) => {
  if (!onCache) {
    if (canUseDOM) {
      if (document.addEventListener)
        onCache = (node, eventName, handler, capture) =>
          node.addEventListener(eventName, handler, capture || false)

      else if (document.attachEvent)
        onCache = (node, eventName, handler) =>
          node.attachEvent('on' + eventName, (e) => {
            e = e || window.event
            e.target = e.target || e.srcElement
            e.currentTarget = node
            handler.call(node, e)
          })
    } else {
      onCache = () => {}
    }
  }

  return onCache(node, eventName, handler, capture)
}

export default on
