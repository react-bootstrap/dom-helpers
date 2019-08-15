import css from './css'
import hyphenate from './hyphenate'
import isTransform, { TransformValue } from './isTransform'
import off from './off'
import on, { EventHandler } from './on'
import { TRANSITION_SUPPORTED, emulateTransitionEnd } from './transitionEnd'
import { Property } from './types'

let reset: Partial<Record<Property, string>> = {
  transition: '',
  'transition-duration': '',
  'transition-delay': '',
  'transition-timing-function': '',
}

type AnimateProperties = Record<Property | TransformValue, string>

interface Options {
  node: HTMLElement
  properties: AnimateProperties
  duration?: number
  easing?: string
  callback?: EventHandler<'transitionend'>
}

interface Cancel {
  cancel(): void
}

// super lean animate function for transitions
// doesn't support all translations to keep it matching the jquery API
/**
 * code in part from: Zepto 1.1.4 | zeptojs.com/license
 */
function _animate({
  node,
  properties,
  duration = 200,
  easing,
  callback,
}: Options) {
  let cssProperties = [] as Property[]

  let cssValues: Partial<Record<Property, string>> = {}

  let transforms = ''

  if (!TRANSITION_SUPPORTED) duration = 0

  Object.keys(properties).forEach((key: Property) => {
    const value = properties[key]

    if (isTransform(key)) transforms += `${key}(${value}) `
    else {
      cssValues[key] = value
      cssProperties.push(hyphenate(key) as Property)
    }
  })

  if (transforms) {
    cssValues.transform = transforms
    cssProperties.push('transform')
  }

  function done(this: HTMLElement, event: TransitionEvent) {
    if (event.target !== event.currentTarget) return

    css(node, reset)
    if (callback) callback.call(this, event)
  }

  if (duration > 0) {
    cssValues.transition = cssProperties.join(', ')
    cssValues['transition-duration'] = `${duration / 1000}s`
    cssValues['transition-delay'] = `${0}s`
    cssValues['transition-timing-function'] = easing || 'linear'

    on(node, 'transitionend', done)
    emulateTransitionEnd(node, duration)
  }

  // eslint-disable-next-line no-unused-expressions
  node.clientLeft // trigger page reflow

  css(node, cssValues)

  return {
    cancel() {
      off(node, 'transitionend', done)
      css(node, reset)
    },
  }
}

function animate(options: Options): Cancel
function animate(
  node: HTMLElement,
  properties: AnimateProperties,
  duration: number
): Cancel
function animate(
  node: HTMLElement,
  properties: AnimateProperties,
  duration: number,
  callback: EventHandler<'transitionend'>
): Cancel
function animate(
  node: HTMLElement,
  properties: AnimateProperties,
  duration: number,
  easing: string,
  callback: EventHandler<'transitionend'>
): Cancel
function animate(
  nodeOrOptions: HTMLElement | Options,
  properties?: AnimateProperties,
  duration?: number,
  easing?: string | EventHandler<'transitionend'>,
  callback?: EventHandler<'transitionend'>
) {
  if (!('nodeType' in nodeOrOptions)) {
    return _animate(nodeOrOptions)
  }

  if (!properties) {
    throw new Error('must include properties to animate')
  }
  if (typeof easing === 'function') {
    callback = easing
    easing = ''
  }

  return _animate({
    node: nodeOrOptions,
    properties,
    duration,
    easing,
    callback,
  })
}

export default animate
