const regExpNbspEntity = /&nbsp;/gi;
const regExpNbspHex = /\xA0/g;
const regExpSpaces = /\s+([^\s])/gm;

/**
 * Collects the text content of a given element.
 * 
 * @param node the element
 * @param trim whether to remove trailing whitespace chars
 * @param singleSpaces whether to convert multiple whitespace chars into a single space character
 */
export default function text(
  node: HTMLElement | null,
  trim = true,
  singleSpaces = true
): string {
  let elementText: string | null = '';
  
  if (node) {
    elementText = (node.textContent || '').replace(regExpNbspEntity, ' ').replace(regExpNbspHex, ' ');
    if (trim) {
      elementText = elementText.trim();
    }
    if (singleSpaces) {
      elementText = elementText.replace(regExpSpaces, ' $1');
    }    
  }
  
  return elementText;
}