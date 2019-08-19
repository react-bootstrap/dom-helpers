import css from './css'
import ownerDocument from './ownerDocument'

const isHTMLElement = (e: Element | null): e is HTMLElement =>
  !!e && 'offsetParent' in e

export default function offsetParent(node: HTMLElement): HTMLElement {
  let doc = ownerDocument(node)
  let parent = node && node.offsetParent

  while (
    isHTMLElement(parent) &&
    parent.nodeName !== 'HTML' &&
    css(parent, 'position') === 'static'
  ) {
    parent = parent.offsetParent
  }

  return (parent || doc.documentElement) as HTMLElement
}
