import addEventListener, { EventHandler } from './addEventListener'
import removeEventListener from './removeEventListener'

function listen<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: EventHandler<K>,
  options?: boolean | AddEventListenerOptions
) {
  addEventListener(node, eventName, handler, options)
  return () => {
    removeEventListener(node, eventName, handler, options)
  }
}

export default listen
