/* eslint-disable no-cond-assign, no-continue */

import css from './css'
import height from './height'
import isDocument from './isDocument'

/**
 * Find the first scrollable parent of an element.
 *
 * @param element Starting element
 * @param firstPossible Stop at the first scrollable parent, even if it's not currently scrollable
 */
export default function scrollPrarent(
  element: HTMLElement,
  firstPossible?: boolean
) {
  let position = css(element, 'position')
  let excludeStatic = position === 'absolute'
  let ownerDoc = element.ownerDocument

  if (position === 'fixed') return ownerDoc || document

  // @ts-ignore
  while ((element = element.parentNode) && !isDocument(element)) {
    let isStatic = excludeStatic && css(element, 'position') === 'static',
      style =
        (css(element, 'overflow') || '') +
        (css(element, 'overflow-y') || '') +
        css(element, 'overflow-x')

    if (isStatic) continue

    if (
      /(auto|scroll)/.test(style) &&
      (firstPossible || height(element) < element!.scrollHeight)
    ) {
      return element
    }
  }

  return ownerDoc || document
}
