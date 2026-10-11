const transitionEnd = require('../src/transitionEnd')

describe('transitionEnd', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should use the unit of the first duration in a mixed-unit list', () => {
    const el = document.createElement('div')
    el.style.transitionDuration = '1.4s, 500ms'
    const handler = sinon.spy()
    const remove = transitionEnd(el, handler)

    clock.tick(1300)
    expect(handler.callCount).to.equal(0)
    clock.tick(200)
    expect(handler.callCount).to.equal(1)
    remove()
  })

  it('should preserve a millisecond-first duration list', () => {
    const el = document.createElement('div')
    el.style.transitionDuration = '500ms, 1.4s'
    const handler = sinon.spy()
    const remove = transitionEnd(el, handler)

    clock.tick(400)
    expect(handler.callCount).to.equal(0)
    clock.tick(200)
    expect(handler.callCount).to.equal(1)
    remove()
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
