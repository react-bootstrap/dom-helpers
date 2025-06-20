import matches from './matches.ts';

export default function collectSiblings(
  node: Element | null,
  refNode: Element | null = null,
  selector: string | null = null
): Element[] {
  const siblings: Element[] = [];

  for (; node; node = node.nextElementSibling) {
    if (node !== refNode) {
      if (selector && matches(node, selector)) {
        break;
      }
      siblings.push(node);
    }
  }

  return siblings;
}
