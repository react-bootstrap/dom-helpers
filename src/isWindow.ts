export default function isWindow(
  node: Element | Document | Window
): Window | false {
  if ('window' in node && node.window === node) return node
  if ('nodeType' in node && node.nodeType === document.DOCUMENT_NODE) {
    // @ts-ignore
    return node.defaultView || node.parentWindow
  }

  return false
}
