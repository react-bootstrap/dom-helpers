import ownerDocument from './ownerDocument.ts';

/**
 * Returns the owner window of a given element.
 *
 * @param node the element
 */
export default function ownerWindow(node?: Element): Window {
  const doc = ownerDocument(node);
  return (doc && doc.defaultView) || window;
}
