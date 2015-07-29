var raf = require('../src/util/requestAnimationFrame')
var scrollbarSize = require('../src/util/scrollbarSize')

describe('utils', () => {

  describe('requestAnimationFrame', () => {

    it('should find api', done => {
      raf(() => done())
    })

    it('should cancel', done => {
      var id = raf(() => { throw new Error() })

      raf.cancel(id)

      setTimeout(() => done(), 30)
    })
  })

  describe('scrollbarSize', () => {

    it('should return a size', () => {
      expect(scrollbarSize()).to.be.a('number')
    })

    it('should return a size when recalculating', () => {
      scrollbarSize()
      expect(scrollbarSize(true)).to.be.a('number')
    })

    it('should return a size over and over again', () => {
      expect(scrollbarSize()).to.be.a('number')
      expect(scrollbarSize()).to.be.a('number')
      expect(scrollbarSize()).to.be.a('number')
    })
  })

})