const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice)

/**
 * Collects all child nodes of an element.
 * 
 * @param node the node
 */
export default function childNodes(
  node: Element | null
): Node[] {
  return node ? toArray(node.childNodes) : [];
}