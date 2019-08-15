import ownerDocument from '../ownerDocument'
import canUseDOM from '../util/inDOM'
import qsa from './querySelectorAll'

let matchesCache: (node: Element, selector: string) => boolean

function ie8MatchesSelector(node: HTMLElement, selector: string) {
  let match = qsa(ownerDocument(node), selector)
  let i = 0

  while (match[i] && match[i] !== node) i++
  return !!match[i]
}

export default function matches(node: Element, selector: string) {
  if (!matchesCache && canUseDOM) {
    let body: any = document.body
    let nativeMatch =
      body.matches ||
      body.matchesSelector ||
      body.webkitMatchesSelector ||
      body.mozMatchesSelector ||
      body.msMatchesSelector

    matchesCache = nativeMatch
      ? (n: Element, s: string) => nativeMatch.call(n, s)
      : ie8MatchesSelector
  }

  return matchesCache ? matchesCache(node, selector) : false
}
