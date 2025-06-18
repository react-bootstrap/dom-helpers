import matches from './matches.ts';

/**
 * Returns the closest parent element that matches a given selector.
 *
 * @param node the reference element
 * @param selector the selector to match
 * @param stopAt stop traversing when this element is found
 */
export default function closest(node: Element, selector: string, stopAt?: Element): Element | null {
  if (node.closest && !stopAt) node.closest(selector);

  let nextNode: Element | null = node;
  do {
    if (matches(nextNode, selector)) return nextNode;
    nextNode = nextNode.parentElement;
  } while (nextNode && nextNode !== stopAt && nextNode.nodeType === document.ELEMENT_NODE);

  return null;
}
