import canUseDOM from './inDOM'

type Vendor = '' | 'webkit' | 'moz' | 'o' | 'ms'

type RequestAnimationFrame = typeof requestAnimationFrame

interface CompatRequestAnimationFrame extends RequestAnimationFrame {
  cancel(id: number): void
}

/* https://github.com/component/raf */
let prev = new Date().getTime()
function fallback(fn: FrameRequestCallback): number {
  let curr = new Date().getTime()
  let ms = Math.max(0, 16 - (curr - prev))
  let handle = setTimeout(fn, ms)

  prev = curr
  return handle as any
}

let vendors = ['', 'webkit', 'moz', 'o', 'ms'] as Vendor[]
let cancel = 'clearTimeout'
let raf: typeof requestAnimationFrame = fallback

// eslint-disable-next-line import/no-mutable-exports

let getKey = (vendor: Vendor, k: string) =>
  `${vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1))}AnimationFrame`

if (canUseDOM) {
  vendors.some(vendor => {
    let rafKey = getKey(vendor, 'request')

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel')
      // @ts-ignore
      raf = cb => window[rafKey](cb)
    }
    return raf
  })
}

const compatRaf: CompatRequestAnimationFrame = Object.assign(
  (cb: FrameRequestCallback) => raf(cb),
  {
    cancel(id: number) {
      // @ts-ignore
      if (typeof window[cancel] === 'function') window[cancel](id)
    },
  }
)

export default compatRaf
