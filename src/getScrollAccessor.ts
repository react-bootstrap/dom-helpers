import isWindow from './isWindow.ts';

export default function getscrollAccessor(offset: 'pageXOffset' | 'pageYOffset') {
  const prop: 'scrollLeft' | 'scrollTop' = offset === 'pageXOffset' ? 'scrollLeft' : 'scrollTop';

  function scrollAccessor(node: Element): number;
  function scrollAccessor(node: Element, val: number): undefined;
  function scrollAccessor(node: Element, val?: number) {
    const win = isWindow(node);

    if (val === undefined) {
      return win ? win[offset] : node[prop];
    }

    if (win) {
      win.scrollTo(win[offset], val);
    } else {
      node[prop] = val;
    }
  }

  return scrollAccessor;
}
