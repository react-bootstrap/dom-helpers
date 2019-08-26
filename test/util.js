const { request, cancel } = require('../src/animationFrame')
const scrollbarSize = require('../src/scrollbarSize')

describe('utils', () => {
  describe('requestAnimationFrame', () => {
    it('should find api', done => {
      request(() => done())
    })

    it('should cancel', done => {
      const id = request(() => {
        throw new Error()
      })

      cancel(id)

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
