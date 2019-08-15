export default function hasClass(
  element: Element | SVGElement,
  className: string
) {
  if (element.classList)
    return !!className && element.classList.contains(className)

  return (
    ` ${element.className.baseVal || element.className} `.indexOf(
      ` ${className} `
    ) !== -1
  )
}
