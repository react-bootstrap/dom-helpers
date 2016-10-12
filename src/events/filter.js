import contains from '../query/contains'
import qsa from '../query/querySelectorAll'

export default function filterEvents(selector, handler) {
  return function filterHandler(e) {
    let top = e.currentTarget
      , target = e.target
      , matches = qsa(top, selector);

    if (matches.some(match => contains(match, target)))
      handler.call(this, e)
  }
}
