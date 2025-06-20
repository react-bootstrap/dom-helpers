/**
 * Triggers an event on a given element.
 *
 * @param node the element
 * @param eventName the event name to trigger
 * @param bubbles whether the event should bubble up
 * @param cancelable whether the event should be cancelable
 */
export default function triggerEvent<K extends keyof HTMLElementEventMap>(
  node: HTMLElement | null,
  eventName: K,
  bubbles = false,
  cancelable = true
) {
  if (node) {
    const event: Event = document.createEvent('HTMLEvents');

    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}
