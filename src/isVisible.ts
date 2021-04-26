/**
 * Checks if a given element is currently visible.
 * 
 * @param node the element to check
 */
export default function isVisible(
  node: HTMLElement | null
) : boolean {
  return node ? !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length) : false;
}