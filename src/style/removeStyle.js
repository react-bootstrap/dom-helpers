export default function removeStyle(node, key){
  return ('removeProperty' in node.style)
    ? node.style.removeProperty(key)
    : node.style.removeAttribute(key)
}
