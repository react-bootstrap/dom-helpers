export default function prepend(
  node: Element | null,
  parent: Element | null
): Element | null {
  if (node && parent) {
    if (parent.firstElementChild) {
      parent.insertBefore(node, parent.firstElementChild);
    } else {
      parent.appendChild(node);
    }
    return node;
  }
  return null;
}