import collectSiblings from './collectSiblings';

export default function nextUntil(
  node: Element | null,
  selector: string
): Element[] {
  return collectSiblings(node, node, selector);
}