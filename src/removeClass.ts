function replaceClassName(origClass: string, classToRemove: string) {
  return origClass
    .replace(new RegExp(`(^|\\s)${classToRemove}(?:\\s|$)`, 'g'), '$1')
    .replace(/\s+/g, ' ')
    .replace(/^\s*|\s*$/g, '')
}

/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */
export default function removeClass(
  element: Element | SVGElement,
  className: string
) {
  if (element.classList) {
    element.classList.remove(className)
  } else if (typeof element.className === 'string') {
    (element as Element).className = replaceClassName(
      element.className,
      className
    )
  } else {
    element.setAttribute(
      'class',
      replaceClassName(
        (element.className && element.className.baseVal) || '',
        className
      )
    )
  }
}
