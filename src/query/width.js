import offset from './offset'
import getWindow from './isWindow'

export default function width(node, client){
  var win = getWindow(node)
  return win
    ? win.innerWidth
    : client
      ? node.clientWidth
      : offset(node).width
}
