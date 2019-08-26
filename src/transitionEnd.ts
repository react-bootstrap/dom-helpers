import css from './css'
import listen from './listen'

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any

export const TRANSITION_SUPPORTED = 'ontransitionend' in window

export function parseDuration(node: HTMLElement) {
  let str = css(node, 'transitionDuration') || ''

  let mult = str.indexOf('ms') === -1 ? 1000 : 1
  return parseFloat(str) * mult
}

function triggerTransitionEnd(element: HTMLElement) {
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('transitionend', true, true)
  element.dispatchEvent(evt)
}

export function emulateTransitionEnd(
  element: HTMLElement,
  duration: number,
  padding = 5
) {
  let called = false

  let handle = setTimeout(() => {
    if (!called) triggerTransitionEnd(element)
  }, duration + padding)

  const remove = listen(
    element,
    'transitionend',
    () => {
      called = true
    },
    { once: true }
  )
  return () => {
    clearTimeout(handle)
    remove()
  }
}

function transitionEnd(
  element: HTMLElement,
  handler: Listener,
  duration?: number
) {
  if (!TRANSITION_SUPPORTED) {
    return emulateTransitionEnd(element, 0, 0)
  }

  if (duration == null) duration = parseDuration(element) || 0
  emulateTransitionEnd(element, duration)

  return listen(element, 'transitionend', handler)
}

export default transitionEnd
