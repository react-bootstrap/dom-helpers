var query = require('../src/query')


describe('Query helpers', () => {

  

  describe('Contains', () => {
    beforeEach(()=>{
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('should check for contained element', ()=> {
      var child = document.getElementById('item-3')
        , parent = document.getElementById('item-1');

      expect(query.contains(parent, child)).to.be.ok()
      expect(query.contains(child, parent)).to.not.be.ok()
    })

    it('should handle orphaned elements', ()=> {
      var  orphan = document.createElement('div');

      expect(query.contains(document.body, orphan)).to.not.be.ok()
    })

  })

  describe('ScrollParent', () => {
    beforeEach(()=>{
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('should find scroll parent for inline elements', ()=> {
      var child = document.getElementById('scroll-child')
        , parent = document.getElementById('scroll-parent');

      expect(query.scrollParent(child)).to.be.equal(parent)
    })

    it('should ignore static parents when absolute', ()=> {
      var child = document.getElementById('scroll-child-rel')
        , parent = document.getElementById('scroll-parent-rel');

      expect(query.scrollParent(child)).to.be.equal(parent)
    })

    it('should handle fixed', () => {
      var child = document.getElementById('scroll-child-fixed');

      expect(query.scrollParent(child) === document).to.be.equal(true)
    })
  })

  describe('Offset', () => {

    beforeEach(()=> {
      document.body.innerHTML = window.__html__['test/fixtures/offset.html']
    })

    it('should handle absolute position', ()=> {
      var item = document.getElementById('item-abs');

      var offset = query.offset(item);

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(350)
    })


    it('should handle nested positioning', ()=> {
      var item = document.getElementById('item-nested-abs');

      var offset = query.offset(item);

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(200)
    })

    it('should handle fixed offset', ()=> {
      var item = document.getElementById('item-fixed');

      var offset = query.offset(item);

      expect(offset.top).to.be.equal(400)
      expect(offset.left).to.be.equal(350)
    })
  })

})