import getScrollAccessor from './getScrollAccessor.ts';

/**
 * Gets or sets the scroll top position of a given element.
 *
 * @param node the element
 * @param val the position to set
 */
export default getScrollAccessor('pageYOffset');
