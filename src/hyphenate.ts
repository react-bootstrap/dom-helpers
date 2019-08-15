let rUpper = /([A-Z])/g

export default function hyphenate(string: string) {
  return string.replace(rUpper, '-$1').toLowerCase()
}
