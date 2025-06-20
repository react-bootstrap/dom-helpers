export default function isDocument(element: Element | Document | Window): element is Document {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}
