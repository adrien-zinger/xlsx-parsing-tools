// Parse table horizontal style. Get json

/*

       |   A  |  B
  Name | val1 | val2

=>
{
  "Name": {
    "A": "val1",
    "B": "val2"
  }
}
*/

export default function getJsonFromTable(
  table,
  { keyAdapter, headAdapter, id } = {}
) {
  if (keyAdapter === undefined) keyAdapter = (key) => key
  if (headAdapter === undefined) headAdapter = (head) => head
  const out = {}
  const keyLine = {}
  const keyCount = {}
  for (let i = 0; i < table[0].length; ++i)
    if (table[0][i] !== "") {
      const key = keyAdapter(table[0][i], id)
      if (key === undefined) continue
      console.log('parse key', key)
      if (keyCount[key] === undefined) {
        keyCount[key] = 1
        keyLine[i] = key
      } else {
        keyLine[i] = key + (++keyCount[key])
      }
    }
  for (let i = 1; i < table.length; ++i) {
    const arr = table[i]
    const head = headAdapter(arr[0], id)
    if (head === undefined) continue
    out[head] = {}
    for (let j = 1; j < arr.length; ++j)
      if (keyLine[j] !== undefined) out[head][keyLine[j]] = arr[j]
  }
  return out
}
