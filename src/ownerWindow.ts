import ownerDocument from './ownerDocument'

export default function ownerWindow(node?: Element): Window {
  let doc = ownerDocument(node)
  return (doc && doc.defaultView) || (doc as any).parentWindow
}
