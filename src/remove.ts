/**
 * Removes a given node from the DOM.
 *
 * @param node the node to remove
 */
export default function remove(node: Node | null): Node | null {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
    return node;
  }
  return null;
}
