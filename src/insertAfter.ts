export default function insertAfter(
  node: Node | null,
  refNode: Node | null
): Node | null {
  if (node && refNode && refNode.parentNode) {
    if (refNode.nextSibling) {
      refNode.parentNode.insertBefore(node, refNode.nextSibling);
    } else {
      refNode.parentNode.appendChild(node);
    }
    return node;
  }
  return null;
}