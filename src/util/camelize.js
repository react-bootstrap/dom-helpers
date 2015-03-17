var rHyphen = /-(.)/g;

module.exports = function camelize(string) {
  return string.replace(rHyphen, (_, char) => char.toUpperCase())
}