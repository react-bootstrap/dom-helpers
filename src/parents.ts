import collectElements from './collectElements';

export default function parents(
  node: Element | null
): Element[] {
  return collectElements(node, 'parentElement');
}