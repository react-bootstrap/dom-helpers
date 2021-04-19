import collectSiblings from './collectSiblings';

export default function children(
  node: Element | null
): Element[] {
  return collectSiblings(node ? node.firstElementChild : null);
}