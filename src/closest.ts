import isDocument from './isDocument'
import matches from './matches'

export default function closest(
  node: Element,
  selector: string,
  stopAt?: Element
): Element | null {
  if (node.closest && !stopAt) node.closest(selector)

  let nextNode: Element | null = node
  do {
    if (matches(nextNode, selector)) return nextNode
    nextNode = nextNode.parentElement
  } while (
    nextNode &&
    nextNode !== stopAt &&
    nextNode.nodeType === document.ELEMENT_NODE
  )

  return null
}
