import canUseDOM from '../util/inDOM'
import on from './on'
import off from './off'

let listen = () => {}

if (canUseDOM) {
  listen = (node, eventName, handler, capture) => {
    on(node, eventName, handler, capture);
    return () => {
      off(node, eventName, handler, capture);
    }
  }
}

export default listen
