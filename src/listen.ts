import off from './off'
import on, { EventHandler } from './on'

function listen<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: EventHandler<K>,
  options?: boolean | AddEventListenerOptions
) {
  on(node, eventName, handler, options)
  return () => {
    off(node, eventName, handler, options)
  }
}

export default listen
