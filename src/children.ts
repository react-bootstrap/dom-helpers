export default function children(
  node: Element | null
): Element[] {
  return node ? Array.from(node.children) : [];
}