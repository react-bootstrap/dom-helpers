import matches from './matches'

let isDoc = (obj: any) => obj != null && obj.nodeType === document.DOCUMENT_NODE

export default function closest(
  node: Element,
  selector: string,
  context: Element
): Element | undefined {
  while (node && (isDoc(node) || !matches(node, selector))) {
    // @ts-ignore
    node = node !== context && !isDoc(node) ? node.parentNode : undefined
  }
  return node
}
