var raf = require('../src/util/requestAnimationFrame')

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
})