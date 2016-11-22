import canUseDOM from '../util/inDOM'

let on = () => {}
if (canUseDOM) {
  on = (function(){

    if (document.addEventListener)
      return (node, eventName, handler, capture) =>
          node.addEventListener(eventName, handler, capture || false);

    else if (document.attachEvent)
      return (node, eventName, handler) =>
          node.attachEvent('on' + eventName, (e) => {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            e.currentTarget = node;
            handler.call(node, e);
          });
  })();
}

export default on
