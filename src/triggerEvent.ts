export default function triggerEvent<K extends keyof HTMLElementEventMap>(
  node: HTMLElement | null,
  eventName: K
) {
  if (node) {
    const event: Event = document.createEvent('HTMLEvents');
    
    event.initEvent(eventName, false, true);
    node.dispatchEvent(event);
  }
}