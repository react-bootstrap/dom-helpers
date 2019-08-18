/* eslint-disable no-nested-ternary */

import { cancel, request } from './animationFrame'
import height from './height'
import getWindow from './isWindow'
import getOffset from './offset'
import getScrollParent from './scrollParent'
import scrollTop from './scrollTop'

export default function scrollTo(
  selected: HTMLElement,
  scrollParent?: HTMLElement
) {
  let offset = getOffset(selected)
  let poff = { top: 0, left: 0 }

  let selectedTop: number
  let selectedHeight, bottom

  if (!selected) return undefined

  let list = scrollParent || (getScrollParent(selected) as HTMLElement)
  let isWin = getWindow(list)
  let listScrollTop = scrollTop(list)

  let listHeight = height(list, true)

  if (!isWin) poff = getOffset(list)

  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width,
  }

  selectedHeight = offset.height
  selectedTop = offset.top + (isWin ? 0 : listScrollTop)
  bottom = selectedTop + selectedHeight

  listScrollTop =
    listScrollTop > selectedTop
      ? selectedTop
      : bottom > listScrollTop + listHeight
      ? bottom - listHeight
      : listScrollTop

  let id = request(() => scrollTop(list, listScrollTop))
  return () => cancel(id)
}
