import getWindow from './isWindow'
import offset from './offset'

export default function width(node: HTMLElement, client?: boolean) {
  let win = getWindow(node)
  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width
}
