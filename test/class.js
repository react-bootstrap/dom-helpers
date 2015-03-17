var cls = require('../src/class')


describe('Class helpers', () => {

  beforeEach(()=>{
    document.body.innerHTML = window.__html__['test/fixtures/class.html']
  })

  it('should add a class', () => {
    var el = document.getElementById('item-1');

    cls.addClass(el, 'my-class')

    expect(el.className).to.contain('my-class')
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
  
})