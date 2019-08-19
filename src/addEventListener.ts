/* eslint-disable no-return-assign */
import canUseDOM from './canUseDOM'

export let optionsSupported = false
export let onceSupported = false

try {
  const options = {
    get passive() {
      return (optionsSupported = true)
    },
    get once() {
      // eslint-disable-next-line no-multi-assign
      return (onceSupported = optionsSupported = true)
    },
  }
  if (canUseDOM) {
    window.addEventListener('test', options as any, options)
    window.removeEventListener('test', options as any, true)
  }
} catch (e) {
  /* */
}

export type EventHandler<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  event: HTMLElementEventMap[K]
) => any

export type TaggedEventHandler<
  K extends keyof HTMLElementEventMap
> = EventHandler<K> & { __once?: EventHandler<K> }
/**
 * An `addEventListener` ponyfill, supports the `once` option
 */
function addEventListener<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: TaggedEventHandler<K>,
  options?: boolean | AddEventListenerOptions
) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    const { once, capture } = options
    let wrappedHandler = handler
    if (!onceSupported && once) {
      wrappedHandler =
        handler.__once ||
        function onceHandler(event) {
          this.removeEventListener(eventName, onceHandler, capture)
          handler.call(this, event)
        }
      handler.__once = wrappedHandler
    }

    node.addEventListener(
      eventName,
      wrappedHandler,
      optionsSupported ? options : capture
    )
  }

  node.addEventListener(eventName, handler, options)
}

export default addEventListener
