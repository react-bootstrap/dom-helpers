var { parseDuration } = require('../src/transitionEnd')

describe('Transition helpers', () => {
  it('should parse duration from node property', () => {
    var el = document.createElement('div')

    el.style.transitionDuration = '1.4s'

    expect(parseDuration(el)).to.equal(1400)

    el.style.transitionDuration = '500ms'

    expect(parseDuration(el)).to.equal(500)
  })
})
