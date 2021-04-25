const manip = require('../src');

describe('DOM manipulation helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/fixtures/dom-manip.html']
  });
  
  it('should check for input elements', () => {
    const input = document.querySelector('#child-1 :first-child');
    const nonInput = document.querySelector('#child-1 :last-child');
    
    expect(manip.isInput(input)).to.be(true);
    expect(manip.isInput(nonInput)).to.be(false);
  });
  
  it('should check for visible elements', () => {
    const invisible = document.querySelector('#child-1 > span');
    const visible = document.querySelector('#child-2 > span');
    
    expect(manip.isVisible(invisible)).to.be(false);
    expect(manip.isVisible(visible)).to.be(true);
  });
  
  it('should get an attribute of an element', () => {
    const el = document.querySelector('#child-1 :first-child');
    const val = manip.attribute(el, 'disabled');
    
    expect(val).to.be('disabled');
  });
  
  it('should set an attribute of an element', () => {
    const el = document.querySelector('#child-1 :first-child');
    let val;
    
    manip.attribute(el, 'disabled', false);
    
    val = manip.attribute(el, 'disabled');
    
    expect(val).to.be(null);
  });
  
  it('should calculate the text content of a node', () => {
    const el = document.querySelector('#child-2 > span');
    
    expect(manip.text(el)).to.be('Text content with multiple lines');
  });
  
  it('should prepend a child on a node', () => {
    const el = document.getElementById('child-2');
    const child = document.createElement('span');
    
    manip.prepend(child, el);
    
    const children = manip.childElements(el);
    
    expect(children.length).to.be(2);
  });
  
  it('should insert a node after a reference node', () => {
    const el = document.querySelector('#child-1 > input');
    const child = document.createElement('span');
    
    manip.insertAfter(child, el);
    
    const children = manip.childElements(el.parentElement);
    
    expect(children.length).to.be(3);
  });
  
  it('should clear an element', () => {
    const el = document.getElementById('child-2');
    
    manip.clear(el);
    
    expect(el.innerHTML).to.be('');
  });
  
  it('should remove an element', () => {
    const el = document.getElementById('child-2');
    
    manip.remove(el);
    
    expect(document.getElementById('child-2')).to.be(null);
  });
});