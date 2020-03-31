import css from './css'
import listen from './listen'

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any

function parseDuration(node: HTMLElement) {
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

export default function transitionEnd(
  element: HTMLElement,
  handler: Listener,
  duration?: number | null,
  padding?: number
) {
  if (duration == null) duration = parseDuration(element) || 0
  const removeEmulate = emulateTransitionEnd(element, duration, padding)

  const remove = listen(element, 'transitionend', handler);

  return () => {
    removeEmulate()
    remove()
  }
}
