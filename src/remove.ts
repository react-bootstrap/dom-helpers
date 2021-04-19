export default function remove(
  node: Node | null
): Node | null {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
    return node;
  }
  return null;
}