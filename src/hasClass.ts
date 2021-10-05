/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
export default function hasClass(
  element: Element | SVGElement,
  className: string
) {
  if (element.classList)
    return !!className && element.classList.contains(className)

  return (
    ` ${element.className || element.className.baseVal} `.indexOf(
      ` ${className} `
    ) !== -1
  )
}
