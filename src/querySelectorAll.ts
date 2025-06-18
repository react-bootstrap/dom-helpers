const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

/**
 * Runs `querySelectorAll` on a given element.
 *
 * @param element the element
 * @param selector the selector
 */
export default function qsa(element: HTMLElement | Document, selector: string): HTMLElement[] {
  return toArray(element.querySelectorAll(selector));
}
