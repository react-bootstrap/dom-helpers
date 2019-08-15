/* eslint-disable no-bitwise, no-cond-assign */
import canUseDOM from '../util/inDOM'

function fallback(context: Element, node: Element) {
  if (node)
    do {
      if (node === context) return true
      // @ts-ignore
    } while ((node = node.parentNode))

  return false
}

export default (function getContains() {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return canUseDOM
    ? function contains(context: Element, node: Element) {
        if (context.contains) {
          return context.contains(node)
        }
        if (context.compareDocumentPosition) {
          return (
            context === node || !!(context.compareDocumentPosition(node) & 16)
          )
        }
        return fallback(context, node)
      }
    : fallback
})()
