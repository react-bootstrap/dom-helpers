import * as CSS from 'csstype'
import isTransform from '../transition/isTransform'
import camelize from '../util/camelizeStyle'
import hyphenate from '../util/hyphenateStyle'
import getComputedStyle from './getComputedStyle'
import removeStyle from './removeStyle'

type Styles = keyof CSSStyleDeclaration

export type HyphenProperty = keyof CSS.PropertiesHyphen
export type CamelProperty = keyof CSS.Properties

export type Property = HyphenProperty | CamelProperty

function style(
  node: HTMLElement,
  property: Partial<Record<Property, string>>
): void
function style<T extends HyphenProperty>(
  node: HTMLElement,
  property: T
): CSS.PropertiesHyphen[T]
function style<T extends CamelProperty>(
  node: HTMLElement,
  property: T
): CSS.Properties[T]
function style<T extends Property>(
  node: HTMLElement,
  property: T | Record<Property, string | number>
) {
  let css = ''
  let transforms = ''

  if (typeof property === 'string') {
    return (
      node.style[camelize(property) as Styles] ||
      getComputedStyle(node).getPropertyValue(hyphenate(property))
    )
  }

  Object.keys(property).forEach((key: Property) => {
    let value = property[key]
    if (!value && value !== 0) {
      removeStyle(node, hyphenate(key))
    } else if (isTransform(key)) {
      transforms += `${key}(${value}) `
    } else {
      css += `${hyphenate(key)}: ${value};`
    }
  })

  if (transforms) {
    css += `transform: ${transforms};`
  }

  node.style.cssText += `;${css}`
}

export default style
