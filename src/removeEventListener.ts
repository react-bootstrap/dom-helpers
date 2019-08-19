import { TaggedEventHandler } from './addEventListener'

function removeEventListener<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventName: K,
  handler: TaggedEventHandler<K>,
  options?: boolean | EventListenerOptions
) {
  let capture =
    options && typeof options !== 'boolean' ? options.capture : options

  node.removeEventListener(eventName, handler, capture)
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture)
  }
}

export default removeEventListener
