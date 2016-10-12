import ownerDocument from '../ownerDocument';
import css from '../style';

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

export default function offsetParent(node) {
  var doc = ownerDocument(node)
    , offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && css(offsetParent, 'position') === 'static' ) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}
