var evt = require('../src/events')
  , simulant = require('simulant')


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
  
})