# dom-helpers

tiny modular DOM lib for ie8+ 

## Install

```sh
npm i -S dom-helpers
```


Mostly just naive wrappers around common DOM API inconsitencies, Cross browser work is minimal and mostly taken from jQuery. This library doesn't do a lot to normalize behavior across browsers, it mostly seeks to provide a common interface, and elminate the need to write the same damn `if (ie8)` statements in every project.

For example `events.on` works in all browsers ie8+ but it uses the native event system so actual event oddities will continue to exist. If you need __robust__ cross-browser support use jQuery. if you are just tired of rewriting:

```js
if (document.addEventListener)
      return (node, eventName, handler, capture) => 
          node.addEventListener(eventName, handler, capture || false);
else if (document.attachEvent)
  return (node, eventName, handler) => 
      node.attachEvent('on' + eventName, handler);
```

over and over again use this. Or you need a ok `getComputedStyle` polyfill but don't want to include all of jquery, use this.

The real advantage to this collection is that any method can be required individually, meaning tools like Browserify or Webpack will only include the exact methods you use. This is great for environments where jQuery doesn't make sense, such as `React` where you only occasionally need to do direct DOM manipulation.

Each level of the module can be required as a whole or you can drill down for a specific method or section:

```js
    var helpers = require('dom-helper')
    var query = require('dom-helper/query')
    var offset = require('dom-helper/query/offset')

    // style is a function
    require('dom-helper/style')(node, { width: '40px' })

    //and a namespace
    var gcs = require('dom-helper/style/getComputedStyle')
```

- dom-helpers
    - query
        + `contains(container, element)`
        + `height(element, useClientHeight)`
        + `width(element, useClientWidth)`
        + `offset(element)` -> `{ top: Number, left: Number, top: height, width: Number}`
        + `scrollTop(element, [value])`
        + `scrollParent(element)`
    - class
        - `addClass(element, className)`
        - `removeClass(element, className)`
        - `hasClass(element, className)`
    - `style(element, propName, [value])` or `style(element, objectOfPropValues)` 
        + `removeStyle(element, styleName)`
        + `getComputedStyle(element)` -> `getPropertyvalue(name)`
    - transition
        + `end(node, handler, [duration])` listens for transition end, and ensures that the handler if called even if the transition fails to fire its end event. Will attempt to read duration from the element, otherwise one can be provided
        + `properties`: Object containing the various vendor specifc transition and transform properties for your browser 
        ```js
           {
            transform: // transform property: 'transform'
            end:       // transitionend
            property:  // transition-property
            timing:    // transition-timing
            delay:     // transition-delay  
            duration:  // transition-duration
           } 
        ```
    - `events`
        + `on(eventname, handler, [capture])`:  capture is silently ignored in ie8
        + `off(eventname, handler, [capture])`: capture is silently ignored in ie8
    - `util` 
        + `requestAnimationFrame`
        + `scrollTo`