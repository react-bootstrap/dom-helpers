import collectSiblings from './collectSiblings';

/**
 * Collects all next sibling elements of an element until a given selector is matched.
 * 
 * @param node the referene node
 * @param selector the selector to match
 */
export default function nextUntil(
  node: Element | null,
  selector: string
): Element[] {
  return collectSiblings(node, node, selector);
}