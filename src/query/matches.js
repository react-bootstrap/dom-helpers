
import canUseDOM from '../util/inDOM'
import qsa from './querySelectorAll'

let matches;
if (canUseDOM) {
  matches = function () {
    
    function ie8MatchesSelector(node, selector) {
      var matches = qsa(node.document || node.ownerDocument, selector)
        , i = 0;

      while (matches[i] && matches[i] !== node) i++;

      return !!matches[i];
    }

    let fn = null;
    return function (node, selector) {
      if (fn === null) {
        let body = document.body

        if (body) {
          let nativeMatch = body.matches
                       || body.matchesSelector
                       || body.webkitMatchesSelector
                       || body.mozMatchesSelector
                       || body.msMatchesSelector;

          fn = nativeMatch
          ? nativeMatch
          : ie8MatchesSelector;
        }
      }
      return fn.call(node, selector)
    }
  }();
}

export default matches
