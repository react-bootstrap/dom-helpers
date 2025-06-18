import * as CSS from 'csstype';
import getComputedStyle from './getComputedStyle.ts';
import hyphenate from './hyphenateStyle.ts';
import isTransform from './isTransform.ts';
import { CamelProperty, HyphenProperty, Property } from './types.ts';

function style(node: HTMLElement, property: Partial<Record<Property, string>>): void;
function style<T extends HyphenProperty>(node: HTMLElement, property: T): CSS.PropertiesHyphen[T];
function style<T extends CamelProperty>(node: HTMLElement, property: T): CSS.Properties[T];
function style<T extends Property>(
  node: HTMLElement,
  property: T | Record<Property, string | number>
) {
  let css = '';
  let transforms = '';

  if (typeof property === 'string') {
    return (
      node.style.getPropertyValue(hyphenate(property)) ||
      getComputedStyle(node).getPropertyValue(hyphenate(property))
    );
  }

  Object.keys(property).forEach((key: Property) => {
    const value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenate(key));
    } else if (isTransform(key)) {
      transforms += `${key}(${value}) `;
    } else {
      css += `${hyphenate(key)}: ${value};`;
    }
  });

  if (transforms) {
    css += `transform: ${transforms};`;
  }

  node.style.cssText += `;${css}`;
}

export default style;
