import addClass from './addClass.ts';
import hasClass from './hasClass.ts';
import removeClass from './removeClass.ts';

/**
 * Toggles a CSS class on a given element.
 *
 * @param element the element
 * @param className the CSS class name
 */
export default function toggleClass(element: Element | SVGElement, className: string) {
  if (element.classList) element.classList.toggle(className);
  else if (hasClass(element, className)) removeClass(element, className);
  else addClass(element, className);
}
