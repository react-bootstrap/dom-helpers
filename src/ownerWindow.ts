import ownerDocument from './ownerDocument'

export default function ownerWindow(node?: Element): Window {
  const doc = ownerDocument(node)
  return (doc && doc.defaultView) || window
}
