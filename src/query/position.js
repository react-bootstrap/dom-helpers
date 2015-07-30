import getOffset from './offset';
import getOffsetParent from './offsetParent';
import scrollTop from './scrollTop';
import scrollLeft from './scrollLeft';
import css from '../style';

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

export default function position(node){
  var parentOffset = { top: 0, left: 0 }
    , offsetParent, offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if (css(node, "position" ) === "fixed") {
    offset = node.getBoundingClientRect();
  }
  else {
    offsetParent = getOffsetParent(node);
    offset = getOffset(node);

    if (nodeName(offsetParent) !== "html")
      parentOffset = getOffset(offsetParent);

    parentOffset.top += (css(offsetParent, "borderTopWidth") - scrollTop(offsetParent)) || 0;
    parentOffset.left += (css(offsetParent, "borderLeftWidth") - scrollLeft(offsetParent)) || 0;
  }

  // Subtract parent offsets and node margins
  return {
    ...offset,
    top:  offset.top  - parentOffset.top  - (css(node, "marginTop" ) || 0),
    left: offset.left - parentOffset.left - (css(node, "marginLeft") || 0)
  };
}