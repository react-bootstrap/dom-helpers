import style from '../style'

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any

export const TRANSITION_SUPPORTED = 'ontransitionend' in window

export function parseDuration(node: HTMLElement) {
  let str = style(node, 'transition-duration') || ''
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
  padding: number = 5
) {
  let called = false

  const emulatedDuration = duration + padding
  function listener() {
    called = true
    element.removeEventListener('transitionend', listener)
  }

  element.addEventListener('transitionend', listener)
  setTimeout(() => {
    if (!called) triggerTransitionEnd(element)
  }, emulatedDuration)
}

function onEnd(node: HTMLElement, handler: Listener, duration?: number) {
  if (!TRANSITION_SUPPORTED) {
    emulateTransitionEnd(node, 0, 0)
    return
  }

  if (duration == null) duration = parseDuration(node) || 0

  node.addEventListener('transitionend', handler, false)

  emulateTransitionEnd(node, duration)
}

export default onEnd
