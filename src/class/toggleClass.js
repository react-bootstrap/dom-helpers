import hasClass from './hasClass'
import removeClass from './removeClass'
import addClass from './addClass'

export default function toggleClass(element, className, force){
  if (element.classList)
    element.classList.toggle(className, force);
  else if (force === false)
    removeClass(element, className)
  else if (force === true)
    addClass(element, className)
  else if (hasClass(element, className))
    removeClass(element, className)
  else
    addClass(element, className)
}
