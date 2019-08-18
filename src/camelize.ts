let rHyphen = /-(.)/g

export default function camelize(string: string): string {
  return string.replace(rHyphen, (_, chr) => chr.toUpperCase())
}
