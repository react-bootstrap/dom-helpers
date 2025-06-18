import hasClass from './hasClass.ts';

/**
 * Adds a CSS class to a given element.
 *
 * @param element the element
 * @param className the CSS class name
 */
export default function addClass(element: Element | SVGElement, className: string) {
  if (element.classList) element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === 'string')
      (element as Element).className = `${element.className} ${className}`;
    else
      element.setAttribute(
        'class',
        `${(element.className && element.className.baseVal) || ''} ${className}`
      );
}
