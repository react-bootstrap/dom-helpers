// Zepto.js
// (c) 2010-2015 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.
let simpleSelectorRE = /^[\w-]*$/
let toArray = Function.prototype.bind.call(Function.prototype.call, [].slice)

export default function qsa(
  element: HTMLElement | Document,
  selector: string
): HTMLElement[] {
  let maybeID = selector[0] === '#',
    maybeClass = selector[0] === '.',
    nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
    isSimple = simpleSelectorRE.test(nameOnly),
    found

  if (isSimple) {
    if (maybeID) {
      element = 'getElementById' in element ? element : document
      found = element.getElementById(nameOnly)
      return found ? [found] : []
    }

    if (element.getElementsByClassName && maybeClass)
      return toArray(element.getElementsByClassName(nameOnly))

    return toArray(element.getElementsByTagName(selector))
  }

  return toArray(element.querySelectorAll(selector))
}
