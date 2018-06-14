import canUseDOM from '../util/inDOM'
import on from './on'
import off from './off'

const listen = (node, eventName, handler, capture) => {
  if (canUseDOM) {
    on(node, eventName, handler, capture);
    return () => {
      off(node, eventName, handler, capture);
    }
  }
}

export default listen
