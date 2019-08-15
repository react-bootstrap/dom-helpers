import activeElement from './activeElement'
import events from './events'
import ownerDocument from './ownerDocument'
import ownerWindow from './ownerWindow'
import query from './query'
import style from './style'
import requestAnimationFrame from './util/requestAnimationFrame'

export * from './events'
export * from './query'
export {
  style,
  activeElement,
  ownerDocument,
  ownerWindow,
  requestAnimationFrame,
}

export default {
  ...events,
  ...query,
  style,
  activeElement,
  ownerDocument,
  ownerWindow,
  requestAnimationFrame,
}
