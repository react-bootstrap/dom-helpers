import canUseDOM from './canUseDOM'

let size: number

export default function scrollbarSize(recalc?: boolean) {
  if ((!size && size !== 0) || recalc) {
    if (canUseDOM) {
      const scrollDiv = document.createElement('div')

      scrollDiv.style.position = 'absolute'
      scrollDiv.style.top = '-9999px'
      scrollDiv.style.width = '50px'
      scrollDiv.style.height = '50px'
      scrollDiv.style.overflow = 'scroll'

      document.body.appendChild(scrollDiv)
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
    }
  }

  return size
}
