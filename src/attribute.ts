/**
 * Gets or sets an attribute of a given element.
 * 
 * @param node the element
 * @param attr the attribute to get or set
 * @param val the attribute value
 */
export default function attribute(
  node: Element | null,
  attr: string,
  val?: string
): string | null | undefined {
  if (node) {
    if (typeof val === 'undefined') {
      return node.getAttribute(attr);
    }
    if (!val && val !== '') {
      node.removeAttribute(attr);
    } else {
      node.setAttribute(attr, val);
    }
  }
}

