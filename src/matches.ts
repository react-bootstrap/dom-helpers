let matchesImpl: (node: Element, selector: string) => boolean

export default function matches(node: Element, selector: string) {
  if (!matchesImpl) {
    let body: any = document.body
    let nativeMatch =
      body.matches ||
      body.matchesSelector ||
      body.webkitMatchesSelector ||
      body.mozMatchesSelector ||
      body.msMatchesSelector

    matchesImpl = (n: Element, s: string) => nativeMatch.call(n, s)
  }

  return matchesImpl(node, selector)
}
