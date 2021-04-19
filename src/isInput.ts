const regExpInputs = /^(?:input|select|textarea|button)$/i;

export default function isInput(
  node: Element | null
): boolean {
  return node ? regExpInputs.test(node.nodeName) : false;
}