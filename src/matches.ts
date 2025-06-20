let matchesImpl: (node: Element, selector: string) => boolean;

/**
 * Checks if a given element matches a selector.
 *
 * @param node the element
 * @param selector the selector
 */
export default function matches(node: Element, selector: string) {
  if (!matchesImpl) {
    const body: any = document.body;
    const nativeMatch =
      body.matches ||
      body.matchesSelector ||
      body.webkitMatchesSelector ||
      body.mozMatchesSelector ||
      body.msMatchesSelector;

    matchesImpl = (n: Element, s: string) => nativeMatch.call(n, s);
  }

  return matchesImpl(node, selector);
}
