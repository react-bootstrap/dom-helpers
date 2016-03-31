/*global expect sinon */
var evt = require('../src/events')
  , simulant = require('simulant')
  , unlisten


describe('Event helpers', () => {

  beforeEach(()=>{
    document.body.innerHTML = window.__html__['test/fixtures/event.html']
  })

  it('should add an event listener', done => {
    var el = document.getElementById('item-2');

    evt.on(el, 'click', () => done())

    simulant.fire(el, 'click')
  })

  it('should remove an event listener', () => {
    var el = document.getElementById('item-2')
      , handler = () => { throw new Error('event fired') };

    evt.on(el, 'click', handler)

    evt.off(el, 'click', handler)

    simulant.fire(el, 'click')
  })

  it('should register an event listener with listen', done => {
    var el = document.getElementById('item-2');
    evt.listen(el, 'click', () => done());
    simulant.fire(el, 'click');
  })

  it('should remove the listener when unlisten() is called', () => {
    var el = document.getElementById('item-2');
    unlisten = evt.listen(el, 'click', () => {
      throw new Error('event fired')
    });
    unlisten();
    simulant.fire(el, 'click');
  })

  it('should filter handlers', () => {
    var span = document.getElementsByTagName('span')[0]
      , sibling = document.getElementById('item-3')
      , parent  = document.getElementById('item-1')
      , filtered = sinon.spy()
      , handler  = sinon.spy();

    evt.on(parent, 'click', handler)
    evt.on(parent, 'click', evt.filter('#item-2', filtered))

    simulant.fire(span, 'click')
    simulant.fire(sibling, 'click')

    expect(filtered.callCount).to.equal(1)
    expect(handler.callCount).to.equal(2)
  })

})
