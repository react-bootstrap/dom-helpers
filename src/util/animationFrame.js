import canUseDOM from './inDOM'

let vendors = ['', 'webkit', 'moz', 'o', 'ms']
let cancel = 'clearTimeout'
let rafImpl    = fallback
let compatRaf

let getKey = (vendor, k) =>
  vendor + (!vendor  ? k :(k[0].toUpperCase() + k.substr(1))) + 'AnimationFrame'

if (canUseDOM) {
  vendors.some(vendor => {
    var rafKey = getKey(vendor, 'request')

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel')
      return rafImpl = cb => window[rafKey](cb)
    }
  })
}

/* https://github.com/component/raf */
let prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime()
    , ms = Math.max(0, 16 - (curr - prev))
    , req = setTimeout(fn, ms)

  prev = curr;
  return req;
}

export let raf = cb => rafImpl(cb)
export let caf = id => {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
}
