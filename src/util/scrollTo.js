import getOffset from '../query/offset'
import height from '../query/height'
import getScrollParent from '../query/scrollParent'
import scrollTop from '../query/scrollTop'
import raf from './requestAnimationFrame'
import getWindow from '../query/isWindow'

export default function scrollTo(selected, scrollParent) {
  let offset = getOffset(selected)
  let poff   = { top: 0, left: 0 }
  let list, listScrollTop, selectedTop, isWin
  let selectedHeight, listHeight, bottom;

  if( !selected ) return

  list          = scrollParent || getScrollParent(selected)
  isWin         = getWindow(list)
  listScrollTop = scrollTop(list)

  listHeight    = height(list, true)
  isWin         = getWindow(list)

  if (!isWin)
    poff = getOffset(list)

  offset = {
    top:    offset.top  - poff.top,
    left:   offset.left - poff.left,
    height: offset.height,
    width:  offset.width
  }

  selectedHeight = offset.height
  selectedTop    = offset.top  + (isWin ? 0 : listScrollTop)
  bottom         = selectedTop + selectedHeight

  listScrollTop = listScrollTop > selectedTop
    ? selectedTop
    : bottom > (listScrollTop + listHeight)
        ? (bottom - listHeight)
        : listScrollTop

  let id = raf(() => scrollTop(list, listScrollTop))
  return () => raf.cancel(id)
}
