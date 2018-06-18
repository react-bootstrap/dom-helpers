'use strict';
import style from './style'
import events from './events'
import query from './query'
import activeElement from './activeElement'
import ownerDocument from './ownerDocument'
import ownerWindow from './ownerWindow'
import { raf, caf } from './util/animationFrame';

export * from './events'
export * from './query'
export {
  style,
  activeElement,
  ownerDocument,
  ownerWindow,
  raf,
  caf
}

export default {
  ...events,
  ...query,
  style,
  activeElement,
  ownerDocument,
  ownerWindow,
  raf,
  caf
}
