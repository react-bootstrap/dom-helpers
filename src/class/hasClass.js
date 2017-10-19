
export default function hasClass(element, className) {
  if ( element.classList)
    return !!className && element.classList.contains(className)
  else
    return ` ${element.className.baseVal || element.className} `.indexOf(` ${className} `) !== -1
}
