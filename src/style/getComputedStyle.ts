import camelize from '../util/camelizeStyle'

let rposition = /^(top|right|bottom|left)$/
let rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i

export default function _getComputedStyle(node: HTMLElement) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`')
  let doc = node.ownerDocument

  return 'defaultView' in doc
    ? doc.defaultView.opener
      ? node.ownerDocument.defaultView.getComputedStyle(node, null)
      : window.getComputedStyle(node, null)
    : // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
      ({
        // ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
        getPropertyValue(prop) {
          let style = node.style

          prop = camelize(prop)

          if (prop === 'float') prop = 'styleFloat'
          // @ts-ignore
          let current = node.currentStyle[prop] || null

          if (current == null && style && style[prop]) current = style[prop]

          if (rnumnonpx.test(current) && !rposition.test(prop)) {
            // Remember the original values
            let left = style.left
            // @ts-ignore
            let runStyle = node.runtimeStyle
            let rsLeft = runStyle && runStyle.left

            // Put in the new values to get a computed value out
            // @ts-ignore
            if (rsLeft) runStyle.left = node.currentStyle.left

            style.left = prop === 'fontSize' ? '1em' : current
            // @ts-ignore
            current = `${style.pixelLeft}px`

            // Revert the changed values
            style.left = left
            if (rsLeft) runStyle.left = rsLeft
          }

          return current
        },
      } as CSSStyleDeclaration)
}
