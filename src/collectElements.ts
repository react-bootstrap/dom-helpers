type TraverseDirection = 'parentElement' | 'previousElementSibling' | 'nextElementSibling';

export default function collectElements(
  node: Element | null,
  direction: TraverseDirection
): Element[] {
  let nextNode: Element | null = null;
  const nodes: Element[] = [];

  nextNode = node ? node[direction] : null;
  while (nextNode && nextNode.nodeType !== 9) {
    nodes.push(nextNode);
    nextNode = nextNode[direction] || null;
  }

  return nodes;
}
