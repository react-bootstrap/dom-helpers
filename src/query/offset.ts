import ownerDocument from '../ownerDocument'
import contains from './contains'
import scrollLeft from './scrollLeft'
import scrollTop from './scrollTop'

export default function offset(node: HTMLElement) {
  let doc = ownerDocument(node)

  let box = { top: 0, left: 0, height: 0, width: 0 }
  let docElem = doc && doc.documentElement

  // Make sure it's not a disconnected DOM node
  if (!docElem || !contains(docElem, node)) return box

  if (node.getBoundingClientRect !== undefined)
    box = node.getBoundingClientRect()

  // IE8 getBoundingClientRect doesn't support width & height
  box = {
    top: box.top + scrollTop(node) - (docElem.clientTop || 0),
    left: box.left + scrollLeft(node) - (docElem.clientLeft || 0),
    width: (box.width == null ? node.offsetWidth : box.width) || 0,
    height: (box.height == null ? node.offsetHeight : box.height) || 0,
  }

  return box
}
