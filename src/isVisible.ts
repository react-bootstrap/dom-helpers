export default function isVisible(
  node: HTMLElement | null
) : boolean {
  return node ? !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length) : false;
}