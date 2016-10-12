/*global expect sinon */
var query = require('../src/query')

var $ = require('jquery');

describe('Query helpers', () => {
  var qsa = query.querySelectorAll

  describe('QuerySelectorAll', () => {

    beforeEach(()=>{
      document.body.innerHTML = window.__html__['test/fixtures/qsa.html']
    })

    it('should use GetElementByTagName', ()=> {
      var spy = sinon.spy(document, 'getElementsByTagName')

      expect(qsa(document, 'li').length).to.equal(3)
      expect(spy.callCount).to.equal(1)

      spy.restore()
    })

    it('should use GetElementById', ()=> {
      var spy = sinon.spy(document, 'getElementById')

      expect(qsa(document, '#ListID').length).to.equal(1)
      expect(spy.callCount).to.equal(1)

      spy.restore()
    })

    it('should use GetElementsByClassName', ()=> {
      var spy = sinon.spy(document, 'getElementsByClassName')

      expect(qsa(document, '.item-class').length).to.equal(1)
      expect(spy.callCount).to.equal(1)
      spy.restore()
    })

    it('should use qsa for complex selectors', ()=> {
      var spy = sinon.spy(document, 'querySelectorAll')

      expect(qsa(document, '.item-class li').length).to.equal(3)
      expect(spy.callCount).to.equal(1)

      spy.restore()
    })
  })

  describe('Matches', () => {
    beforeEach(()=>{
      document.body.innerHTML = window.__html__['test/fixtures/matches.html']
    })

    it('should match', ()=> {
      var child = document.getElementById('middle')
      expect(query.matches(child, '#middle')).to.be.ok()
      expect(query.matches(child, 'li#middle')).to.be.ok()
      expect(query.matches(child, '.item-class li')).to.be.ok()
      expect(query.matches(child, '.item-class')).to.not.be.ok()
    })
  })

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

  describe('Closest', () => {
    beforeEach(()=>{
      document.body.innerHTML = window.__html__['test/fixtures/query.html']
    })

    it('find Closest node', ()=> {
      var child = document.getElementById('item-3')
        , parent = document.getElementById('item-1');

      expect(query.closest(child, '#item-1')).to.equal(parent)
      expect(query.closest(child, '#item-40')).to.not.exist
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

    it('should fallback when there is no gBCR', ()=> {
       var offset = query.offset({ ownerDocument: document });

      expect(offset.top).to.be.equal(0)
      expect(offset.left).to.be.equal(0)
    })

    it('should fallback when node is disconnected', ()=> {
      var offset = query.offset(document.createElement('div'));

      expect(offset.top).to.be.equal(0)
      expect(offset.left).to.be.equal(0)
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

  describe('Position', () => {

    beforeEach(()=> {
      document.body.innerHTML = window.__html__['test/fixtures/offset.html']
    })

    it('should handle fixed offset', ()=> {
      var item = document.getElementById('item-fixed');
      var offset = query.position(item);

      expect({ left: offset.left, top: offset.top }).to.be.eql($(item).position())
    })

    it('should handle absolute position', ()=> {
      var item = document.getElementById('item-abs');

      var offset = query.position(item);

      expect({ left: offset.left, top: offset.top }).to.be.eql($(item).position())
    })

    it('should handle nested positioning', ()=> {
      var item = document.getElementById('item-nested-abs');

      var offset = query.position(item);

      // console.log( $(item).offset(),
      //   $(item).offsetParent().scrollTop())

      // console.log(query.offset(item),
      //   query.scrollTop(query.offsetParent(item)))

      expect({ left: offset.left, top: offset.top }).to.be.eql($(item).position())
    })


  })

})
