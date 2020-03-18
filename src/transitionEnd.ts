import canUseDOM from './canUseDOM'
import css from './css'
import listen from './listen'

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any

export const TRANSITION_SUPPORTED = canUseDOM && 'ontransitionend' in window

export function parseDuration(node: HTMLElement) {
  const str = css(node, 'transitionDuration') || ''

  const mult = str.indexOf('ms') === -1 ? 1000 : 1
  return parseFloat(str) * mult
}

function triggerTransitionEnd(element: HTMLElement) {
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('transitionend', true, true)
  element.dispatchEvent(evt)
}

function emulateTransitionEnd(
  element: HTMLElement,
  duration: number,
  padding = 5
) {
  let called = false

  const handle = setTimeout(() => {
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
  if (duration == null) duration = parseDuration(element) || 0
  const removeEmulate = emulateTransitionEnd(element, duration)

  const remove = listen(element, 'transitionend', handler);

  return () => {
    removeEmulate()
    remove()
  }
}

export default transitionEnd
