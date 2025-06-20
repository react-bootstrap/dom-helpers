import ownerWindow from './ownerWindow.ts';

/**
 * Returns one or all computed style properties of an element.
 *
 * @param node the element
 * @param psuedoElement the style property
 */
export default function getComputedStyle(node: HTMLElement, psuedoElement?: string) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
