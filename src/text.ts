const regExpNbspEntity = /&nbsp;/gi;
const regExpNbspHex = /\xA0/g;
const regExpSpaces = /\s+([^\s])/gm;

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