import { TaggedEventHandler } from './addEventListener'

/**
 * A `removeEventListener` ponyfill
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */

function removeEventListener<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: TaggedEventHandler<K>,
  options?: boolean | EventListenerOptions
) {
  const capture =
    options && typeof options !== 'boolean' ? options.capture : options

  node.removeEventListener(eventName, handler, capture)
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture)
  }
}

export default removeEventListener
