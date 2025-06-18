import canUseDOM from './canUseDOM.ts';

type Vendor = '' | 'webkit' | 'moz' | 'o' | 'ms';

type RequestAnimationFrame = typeof requestAnimationFrame;

/* https://github.com/component/raf */
let prev = new Date().getTime();
function fallback(fn: FrameRequestCallback): number {
  const curr = new Date().getTime();
  const ms = Math.max(0, 16 - (curr - prev));
  const handle = setTimeout(fn, ms);

  prev = curr;
  return handle as any;
}

const vendors = ['', 'webkit', 'moz', 'o', 'ms'] as Vendor[];
let cancelMethod = 'clearTimeout';
let rafImpl: RequestAnimationFrame = fallback;

// eslint-disable-next-line import/no-mutable-exports

const getKey = (vendor: Vendor, k: string) =>
  `${vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1))}AnimationFrame`;

if (canUseDOM) {
  vendors.some((vendor) => {
    const rafMethod = getKey(vendor, 'request');

    if (rafMethod in window) {
      cancelMethod = getKey(vendor, 'cancel');
      // @ts-ignore
      rafImpl = (cb) => window[rafMethod](cb);
    }
    return !!rafImpl;
  });
}

export const cancel = (id: number) => {
  // @ts-ignore
  if (typeof window[cancelMethod] === 'function') window[cancelMethod](id);
};

export const request = rafImpl;
