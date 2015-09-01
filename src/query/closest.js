import matches from './matches';

let isDoc = obj => obj != null && obj.nodeType === obj.DOCUMENT_NODE;

export default function closest(node, selector, context){
  while (node && (isDoc(node) || !matches(node, selector))){
    node = node !== context && !isDoc(node) ? node.parentNode : undefined
  }
  return node
}