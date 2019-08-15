import css from '../style'
import height from './height'

export default function scrollPrarent(node: Element) {
  let position = css(node, 'position')
  let excludeStatic = position === 'absolute'
  let ownerDoc = node.ownerDocument

  if (position === 'fixed') return ownerDoc || document

  // @ts-ignore
  while ((node = node.parentNode) && node.nodeType !== 9) {
    let isStatic = excludeStatic && css(node, 'position') === 'static',
      style =
        css(node, 'overflow') +
        css(node, 'overflow-y') +
        css(node, 'overflow-x')

    if (isStatic) continue

    if (/(auto|scroll)/.test(style) && height(node) < node!.scrollHeight)
      return node
  }

  return document
}
