const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice)

export default function childNodes(
  node: Element | null
): Node[] {
  return node ? toArray(node.childNodes) : [];
}