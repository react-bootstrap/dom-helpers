const traversal = require('../src');

describe('DOM traversal helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/fixtures/dom-traversal.html']
  });
  
  it('should collect child nodes', () => {
    const el = document.getElementById('root');
    
    const nodes = traversal.childNodes(el);
    
    expect(nodes.length).to.be(5);
  });
  
  it('should collect parent elements', () => {
    const el = document.querySelector('.some-class');
    
    const parents = traversal.parents(el);
    
    expect(parents.length).to.be(4);
  });
  
  it('should collect child elements', () => {
    const el = document.getElementById('root');
    
    const elements = traversal.children(el);
    
    expect(elements.length).to.be(2);
  });
  
  it('should collect siblings', () => {
    const el = document.querySelector('.some-class');
    
    const siblings = traversal.siblings(el);
    
    expect(siblings.length).to.be(3);
  });
  
  it('should collect next siblings until a selector is matched', () => {
    const el = document.querySelector('#child-2 div:first-child');
    
    const siblings = traversal.nextUntil(el, '.some-class');
    
    expect(siblings.length).to.be(1);
  });
});