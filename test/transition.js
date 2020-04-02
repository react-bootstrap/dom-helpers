const transitionEnd = require('../src/transitionEnd')

describe('transitionEnd', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should parse duration from node property', () => {
    const el = document.createElement('div')

    el.style.transitionDuration = '1.4s'
    const handler1 = sinon.spy()
    transitionEnd(el, handler1)

    clock.tick(1300)
    expect(handler1.callCount).to.equal(0)
    expect(handler1).to.not.be.called

    clock.tick(200)
    expect(handler1.callCount).to.equal(1)

    el.style.transitionDuration = '500ms'
    const handler2 = sinon.spy()
    transitionEnd(el, handler2)

    clock.tick(400)
    expect(handler2.callCount).to.equal(0)

    clock.tick(200)
    expect(handler2.callCount).to.equal(1)
  })
})
