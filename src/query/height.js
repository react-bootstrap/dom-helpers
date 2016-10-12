import offset from './offset'
import getWindow from './isWindow'

export default function height(node, client){
  let win = getWindow(node)
  return win
    ? win.innerHeight
    : client
      ? node.clientHeight
      : offset(node).height
}
