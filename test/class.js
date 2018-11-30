var cls = require('../src/class')

function removeProperty(property, element) {
  Object.defineProperty(element, property, {
    value: undefined
  })
}

describe('Class helpers', () => {

  beforeEach(()=>{
    document.body.innerHTML = window.__html__['test/fixtures/class.html']
  })

  it('should add a class', () => {
    var el = document.getElementById('item-1');

    cls.addClass(el, 'my-class')

    expect(el.className).to.contain('my-class')
  })

  it('should add a class properly when using a fallback path', () => {
    var el = document.getElementById('item-1')
    removeProperty('classList', el)

    cls.addClass(el, 'test-class')
    expect(cls.hasClass(el, 'test-class')).to.equal(true)

    cls.addClass(el, 'test-class')
    cls.removeClass(el, 'test-class')
    expect(cls.hasClass(el, 'test-class')).to.equal(false)

    cls.addClass(el, 'undefined')
    cls.addClass(el, 'test-class2')
    expect(cls.hasClass(el, 'test-class2')).to.equal(true)
  })

  it('should remove a class', () => {
    var el = document.getElementById('item-2');

    cls.removeClass(el, 'test-class')

    expect(el.className).to.equal('')
  })

  it('should check for a class', () => {
    expect(cls.hasClass(document.getElementById('item-2'), 'test-class')).to.equal(true)
    expect(cls.hasClass(document.getElementById('item-1'), 'test-class')).to.equal(false)
  })

  it('should toggle class', () => {
    var el = document.getElementById('item-1')
    removeProperty('classList', el)

    cls.toggleClass(el, 'test-class')
    expect(cls.hasClass(el, 'test-class')).to.equal(true)
    cls.toggleClass(el, 'test-class')
    expect(cls.hasClass(el, 'test-class')).to.equal(false)
  })
})
