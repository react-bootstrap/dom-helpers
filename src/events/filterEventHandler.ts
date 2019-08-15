import contains from '../query/contains'
import qsa from '../query/querySelectorAll'
import { EventHandler } from './on'

export default function filterEvents<K extends keyof HTMLElementEventMap>(
  selector: string,
  handler: EventHandler<K>
): EventHandler<K> {
  return function filterHandler(this: HTMLElement, e: HTMLElementEventMap[K]) {
    let top = e.currentTarget as HTMLElement
    let target = e.target as HTMLElement
    let matches = qsa(top, selector)

    if (matches.some(match => contains(match, target))) handler.call(this, e)
  }
}
