import canUseDOM from '../util/inDOM'
import { EventHandler, noop } from './on'

const off = (function $off() {
  if (canUseDOM) {
    if (document.addEventListener)
      return <K extends keyof HTMLElementEventMap>(
        node: HTMLElement,
        eventName: K,
        handler: EventHandler<K>,
        options?: boolean | AddEventListenerOptions
      ) => node.removeEventListener(eventName, handler, options)

    return <K extends keyof HTMLElementEventMap>(
      node: HTMLElement,
      eventName: K,
      handler: EventHandler<K>
    ) =>
      // @ts-ignore
      node.detachEvent(`on${eventName}`, handler.___handler || handler)
  }

  return noop
})()

export default off
