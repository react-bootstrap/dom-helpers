const $ = require('jquery')
const query = require('../src')

const qsa = query.querySelectorAll

describe('Query helpers', () => {
  describe('QuerySelectorAll', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/qsa.html']
    })

    it('should use qsa for complex selectors', () => {
      const spy = sinon.spy(document, 'querySelectorAll')

      expect(qsa(document, '.item-class li').length).to.equal(3)
      expect(spy.callCount).to.equal(1)

      spy.restore()
    })
  })

  describe('Matches', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/matches.html']
    })

    it('should match', () => {
      const child = document.getElementById('middle')
      expect(query.matches(child, '#middle')).to.be.ok()
      expect(query.matches(child, 'li#middle')).to.be.ok()
      expect(query.matches(child, '.item-class li')).to.be.ok()
      expect(query.matches(child, '.item-class')).to.not.be.ok()
    })
  })

  describe('Contains', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('should check for contained element', () => {
      const child = document.getElementById('item-3'),
        parent = document.getElementById('item-1')

      expect(query.contains(parent, child)).to.be.ok()
      expect(query.contains(child, parent)).to.not.be.ok()
    })

    it('should handle orphaned elements', () => {
      const orphan = document.createElement('div')

      expect(query.contains(document.body, orphan)).to.not.be.ok()
    })
  })

  describe('Closest', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('find Closest node', () => {
      const child = document.getElementById('item-3'),
        parent = document.getElementById('item-1')

      expect(query.closest(child, '#item-1')).to.equal(parent)
      expect(query.closest(child, '#item-40')).to.not.exist
    })
  })

  describe('ScrollParent', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('should find scroll parent for inline elements', () => {
      const child = document.getElementById('scroll-child'),
        parent = document.getElementById('scroll-parent')

      expect(query.scrollParent(child)).to.be.equal(parent)
    })

    it('should ignore static parents when absolute', () => {
      const child = document.getElementById('scroll-child-rel'),
        parent = document.getElementById('scroll-parent-rel')

      expect(query.scrollParent(child)).to.be.equal(parent)
    })

    it('should handle fixed', () => {
      const child = document.getElementById('scroll-child-fixed')

      expect(query.scrollParent(child) === document).to.be.equal(true)
    })
  })

  describe('Offset', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/offset.html']
    })

    it('should fallback when node is disconnected', () => {
      const offset = query.offset(document.createElement('div'))

      expect(offset.top).to.be.equal(0)
      expect(offset.left).to.be.equal(0)
    })

    it('should handle absolute position', () => {
      const item = document.getElementById('item-abs')

      const offset = query.offset(item)

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(350)
    })

    it('should handle nested positioning', () => {
      const item = document.getElementById('item-nested-abs')

      const offset = query.offset(item)

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(200)
    })

    it('should handle fixed offset', () => {
      const item = document.getElementById('item-fixed')

      const offset = query.offset(item)

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(350)
    })
  })

  describe('Position', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['test/fixtures/offset.html']
    })

    it('should handle fixed offset', () => {
      const item = document.getElementById('item-fixed')
      const offset = query.position(item)

      expect({ left: offset.left, top: offset.top }).to.be.eql(
        $(item).position()
      )
    })

    it('should handle absolute position', () => {
      const item = document.getElementById('item-abs')

      const offset = query.position(item)

      expect({ left: offset.left, top: offset.top }).to.be.eql(
        $(item).position()
      )
    })

    it('should handle nested positioning', () => {
      const item = document.getElementById('item-nested-abs')

      const offset = query.position(item)

      // console.log( $(item).offset(),
      //   $(item).offsetParent().scrollTop())

      // console.log(query.offset(item),
      //   query.scrollTop(query.offsetParent(item)))

      expect({ left: offset.left, top: offset.top }).to.be.eql(
        $(item).position()
      )
    })
  })
})
