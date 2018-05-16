import canUseDOM from '../util/inDOM'
import qsa from './querySelectorAll'

let matchesCache;

export default function matches(node, selector) {
  if (!matchesCache && canUseDOM) {
    let body = document.body
    let nativeMatch = body.matches
                   || body.matchesSelector
                   || body.webkitMatchesSelector
                   || body.mozMatchesSelector
                   || body.msMatchesSelector;

    matchesCache = nativeMatch
      ? (node, selector) => nativeMatch.call(node, selector)
      : ie8MatchesSelector
  }

  return matchesCache ?
    matchesCache(node, selector) :
    null;
}

function ie8MatchesSelector(node, selector) {
  var matches = qsa(node.document || node.ownerDocument, selector)
    , i = 0;

  while (matches[i] && matches[i] !== node) i++;

  return !!matches[i];
}
