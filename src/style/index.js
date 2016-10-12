import camelize from '../util/camelizeStyle'
import hyphenate from '../util/hyphenateStyle'
import _getComputedStyle from './getComputedStyle'
import removeStyle from './removeStyle'
import { transform } from '../transition/properties';
import isTransform from '../transition/isTransform';

export default function style(node, property, value) {
  let css = '';
  let transforms = '';
  let props = property;

  if (property === 'string') {
    if (value === undefined)
      return node.style[camelize(property)]
          || _getComputedStyle(node).getPropertyValue(hyphenate(property))
    else
      (props = {})[property] = value
  }

  Object.keys(props).forEach(key => {
    let value = props[key];
    if (!value && value !== 0) {
      removeStyle(node, hyphenate(key))
    }
    else if (isTransform(key)) {
      transforms += `${key}(${value}) `
    }
    else {
      css += `${hyphenate(key)}: ${value};`
    }
  })

  if (transforms) {
    css += `${transform}: ${transforms};`
  }

  node.style.cssText += ';' + css
}
