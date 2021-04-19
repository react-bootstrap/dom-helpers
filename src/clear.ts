export default function clear(
  node: Node | null
): Node | null {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    return node;
  }
  return null;
}