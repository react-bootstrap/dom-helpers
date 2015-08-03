var $ = require('jquery');
var css = require('../src/style')
var _getComputedStyle = require('../src/style/getComputedStyle')

let style;

function injectCss(rules){
  if (style) reset();
  style = $('<style>' + rules + '</style>');
  style.appendTo('head');
}

function reset(){
  if ( style ) {
    style.remove();
  }
  style = null;
};

describe('style', () => {
  let container;

  beforeEach(()=>{
    container = $('<div/>');
    container.attr('id', 'container');
    container.appendTo('body');
    container = container[0];

    injectCss(`
      body {
        font-size: 16px;
      }

      #container {
        padding-right: 20px;
        margin-left: 1em;
      }
    `);
  });

  afterEach(()=>{
    $(container).remove();
    container = null;
    reset()
  });

  it('should get computed style', () => {
    expect(
      _getComputedStyle(container).getPropertyValue('margin-left')).to.equal('16px');

    expect(
      _getComputedStyle(container).getPropertyValue('padding-right')).to.equal('20px');
  })

  it('should get style', () => {
    expect(css(container,'margin-left')).to.equal('16px');
    expect(css(container,'paddingRight')).to.equal('20px')
    expect(css(container,'padding-right')).to.equal('20px')
  })
})