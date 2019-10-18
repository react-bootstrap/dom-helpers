const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice)

export default function qsa(
  element: HTMLElement | Document,
  selector: string
): HTMLElement[] {
  return toArray(element.querySelectorAll(selector))
}
