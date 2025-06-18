/**
 * Collects all child elements of an element.
 *
 * @param node the element
 */
export default function childElements(node: Element | null): Element[] {
  return node ? Array.from(node.children) : [];
}
