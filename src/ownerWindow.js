import ownerDocument from './ownerDocument';

export default function ownerWindow(node) {
  let doc = ownerDocument(node);
  return doc && doc.defaultView || doc.parentWindow;
}