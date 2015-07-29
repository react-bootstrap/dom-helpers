import ownerDocument from './ownerDocument';

/**
 * document.activeElement
 */
export default function activeElement(doc = document){
  try {
    return doc.activeElement;
  }
  catch (e) {}
}