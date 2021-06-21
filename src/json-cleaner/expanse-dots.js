function containDot(str) {
  for (let i = 0; i < str.length; ++i) if (str[i] === ".") return i
  return -1
}

export default function expanseDots(obj) {
  const ret = {}
  for (const key of Object.keys(obj)) {
    const i = containDot(key)
    if (i > 0) {
      const pre = key.slice(0, i)
      const suf = key.slice(i + 1)
      if (ret[pre] === undefined) ret[pre] = {}
      if (obj[key] instanceof Object) {
        ret[pre][suf] = expanseDots(obj[key])
      } else {
        ret[pre][suf] = obj[key]
      }
    } else {
      if (obj[key] instanceof Object) {
        ret[key] = expanseDots(obj[key])
      } else {
        ret[key] = obj[key]
      }
    }
  }
  return ret
}
