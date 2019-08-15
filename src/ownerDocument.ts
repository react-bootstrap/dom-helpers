export default function ownerDocument(node?: Element) {
  return (node && node.ownerDocument) || document
}
