/**
 * Returns the owner document of a given element.
 *
 * @param node the element
 */
export default function ownerDocument(node?: Element) {
  return (node && node.ownerDocument) || document;
}
