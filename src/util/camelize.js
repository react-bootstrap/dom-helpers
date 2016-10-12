let rHyphen = /-(.)/g;

export default function camelize(string) {
  return string.replace(rHyphen, (_, chr) => chr.toUpperCase())
}
