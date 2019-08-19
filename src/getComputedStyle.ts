import ownerWindow from './ownerWindow'

export default function getComputedStyle(
  node: HTMLElement,
  psuedoElement?: string
) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement)
}
