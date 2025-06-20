import collectElements from './collectElements.ts';

/**
 * Collects all parent elements of a given element.
 *
 * @param node the element
 */
export default function parents(node: Element | null): Element[] {
  return collectElements(node, 'parentElement');
}
