import collectSiblings from './collectSiblings';

export default function siblings(
  node: Element | null
): Element[] {
  return collectSiblings(node && node.parentElement ? node.parentElement.firstElementChild : null, node);
}