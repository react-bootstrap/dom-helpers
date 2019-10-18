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

  if (!selected) return undefined

  const list = scrollParent || (getScrollParent(selected) as HTMLElement)
  const isWin = getWindow(list)
  let listScrollTop = scrollTop(list)

  const listHeight = height(list, true)

  if (!isWin) poff = getOffset(list)

  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width,
  }

  const selectedHeight = offset.height
  const selectedTop = offset.top + (isWin ? 0 : listScrollTop)
  const bottom = selectedTop + selectedHeight

  listScrollTop =
    listScrollTop > selectedTop
      ? selectedTop
      : bottom > listScrollTop + listHeight
      ? bottom - listHeight
      : listScrollTop

  const id = request(() => scrollTop(list, listScrollTop))
  return () => cancel(id)
}
