import { xlsxParser } from '../dist/parse-xlsx'
import { hTableToJson } from '../dist'

test('Test the value adapters', async () => {
  const res = await xlsxParser('./tests/test.xlsx', {
    limits: { default: ['A', 'C', 1, 3] },
  })
  const valueAdapter = (value, { key, head }) => key + head
  const outInverted = hTableToJson(res[0].data, { valueAdapter })
  const outNormal = hTableToJson(res[0].data)
  expect(outInverted).toStrictEqual({
    a: { 1: '1a', 2: '2a' },
    b: { 1: '1b', 2: '2b' },
  })
  expect(outNormal).toStrictEqual({
    a: { 1: 'a1', 2: 'a2' },
    b: { 1: 'b1', 2: 'b2' },
  })
})
