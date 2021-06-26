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

/**
 * @typedef AdapterObject
 * @type {object}
 */

/**
 * Transforms a two dimensional table in a json object
 * @param {*} table
 * @param {object} adapters
 * @returns json object of a two dimensional table
 */
export default function getJsonFromTable(
  table,
  { valueAdapter, keyAdapter, headAdapter, id } = {}
) {
  if (keyAdapter === undefined) keyAdapter = (key) => key
  if (headAdapter === undefined) headAdapter = (head) => head
  if (valueAdapter === undefined)
    valueAdapter = (value, { key, head, id }) => value
  const out = {}
  const keyLine = {} // Map of key: linenumber - value: linekey
  const keyCount = {} // Add a number if two lines have same name
  // fill keyLine with keys
  for (let i = 0; i < table[0].length; ++i)
    if (table[0][i] !== '') {
      const key = keyAdapter(table[0][i], id)
      if (key === undefined) continue
      if (keyCount[key] === undefined) {
        keyCount[key] = 1
        keyLine[i] = key
      } else {
        keyLine[i] = key + ++keyCount[key]
      }
    }
  for (let i = 1; i < table.length; ++i) {
    const arr = table[i] // column array of values
    const head = headAdapter(arr[0], id)
    if (head === undefined) continue
    out[head] = {}
    for (let j = 1; j < arr.length; ++j)
      if (keyLine[j] !== undefined)
        out[head][keyLine[j]] = valueAdapter(arr[j], {
          head,
          key: keyLine[j],
          id,
        })
  }
  return out
}
