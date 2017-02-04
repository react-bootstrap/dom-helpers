var transition = require('../src/transition')

var props = transition.properties;

describe('Transition helpers', () => {
  it('should parse duration from node property', () => {
    var el = document.createElement('div');

    el.style[props.duration] = '1.4s'

    expect(transition.end._parseDuration(el)).to.equal(1400)

    el.style[props.duration] = '500ms'

    expect(transition.end._parseDuration(el)).to.equal(500)
  })
})
