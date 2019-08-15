import ownerDocument from '../ownerDocument'
import css from '../style'

function nodeName(node: Element): string {
  return node.nodeName && node.nodeName.toLowerCase()
}

export default function offsetParent(node: HTMLElement): HTMLElement {
  let doc = ownerDocument(node)
  let parent = node && (node.offsetParent as HTMLElement)

  while (
    parent &&
    nodeName(parent) !== 'html' &&
    css(parent, 'position') === 'static'
  ) {
    parent = (parent as any).offsetParent
  }

  return (parent || doc.documentElement) as HTMLElement
}
