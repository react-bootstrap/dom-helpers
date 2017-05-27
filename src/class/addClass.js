import hasClass from './hasClass'

export default function addClass(element, className){
  if ( element.classList)
    element.classList.add(className)
  else if ( !hasClass(element, className))
    element.className = element.className + ' ' + className
}
