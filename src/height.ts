import getWindow from './isWindow.ts';
import offset from './offset.ts';

/**
 * Returns the height of a given element.
 *
 * @param node the element
 * @param client whether to use `clientHeight` if possible
 */
export default function height(node: HTMLElement, client?: boolean) {
  const win = getWindow(node);
  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
}
