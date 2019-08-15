import isWindow from './isWindow'

export default function getscrollAccessor(
  offset: 'pageXOffset' | 'pageYOffset'
) {
  const prop: 'scrollLeft' | 'scrollTop' =
    offset === 'pageXOffset' ? 'scrollLeft' : 'scrollTop'

  function scrollAccessor(node: Element): number
  function scrollAccessor(node: Element, val: number): undefined
  function scrollAccessor(node: Element, val?: number) {
    let win = isWindow(node)

    if (val === undefined) {
      if (!win) return node[prop]
      return offset in win
        ? win[offset]
        : (win as Window).document.documentElement[prop]
    }

    if (win) {
      win.scrollTo(
        val,
        'offset' in win
          ? win[offset]
          : (win as Window).document.documentElement[prop]
      )
    } else {
      node[prop] = val
    }
  }

  return scrollAccessor
}
