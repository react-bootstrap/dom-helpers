export default function removeStyle(node: HTMLElement, key: string): string {
  return 'removeProperty' in node.style
    ? node.style.removeProperty(key)
    : (node.style as any).removeAttribute(key)
}
