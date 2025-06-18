const regExpInputs = /^(?:input|select|textarea|button)$/i;

/**
 * Checks if a given element is an input (input, select, textarea or button).
 *
 * @param node the element to check
 */
export default function isInput(node: Element | null): boolean {
  return node ? regExpInputs.test(node.nodeName) : false;
}
