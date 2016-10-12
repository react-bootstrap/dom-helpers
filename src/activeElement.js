import ownerDocument from './ownerDocument';

export default function activeElement(doc = ownerDocument()) {
  try {
    return doc.activeElement;
  }
  catch (e) { /* ie throws if no active element */ }
}
