
import canUseDOM from '../util/inDOM'
import qsa from './querySelectorAll'

let matches;
if (canUseDOM) {
  let body = document.body || document.head;
  let nativeMatch = body.matches
                 || body.matchesSelector
                 || body.webkitMatchesSelector
                 || body.mozMatchesSelector
                 || body.msMatchesSelector;

  matches = nativeMatch
    ? (node, selector) => nativeMatch.call(node, selector)
    : ie8MatchesSelector
}

export default matches

function ie8MatchesSelector(node, selector) {
  var matches = qsa(node.document || node.ownerDocument, selector)
    , i = 0;

  while (matches[i] && matches[i] !== node) i++;

  return !!matches[i];
}
