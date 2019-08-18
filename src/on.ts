/* eslint-disable import/no-mutable-exports */
import canUseDOM from './canUseDOM'

export type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => any

export const noop = <K extends keyof HTMLElementEventMap>(
  _node: HTMLElement,
  _eventName: K,
  _handler: EventHandler<K>,
  _options?: boolean | AddEventListenerOptions
) => {}

const on = (function $on() {
  if (canUseDOM) {
    if (document.addEventListener)
      return <K extends keyof HTMLElementEventMap>(
        node: HTMLElement,
        eventName: K,
        handler: EventHandler<K>,
        options?: boolean | AddEventListenerOptions
      ) => node.addEventListener(eventName, handler, options)

    return <K extends keyof HTMLElementEventMap>(
      node: HTMLElement,
      eventName: K,
      handler: EventHandler<K>
    ) => {
      // @ts-ignore
      handler.___handler = e => {
        e = e || window.event
        e.target = e.target || e.srcElement
        e.currentTarget = node
        handler.call(node, e)
      }
      // @ts-ignore
      node.attachEvent(`on${eventName}`, handler.___handler)
    }
  }

  return noop
})()

export default on
