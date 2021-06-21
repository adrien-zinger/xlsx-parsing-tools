/* eslint-disable no-undef */
import parser from "../src/parse-xlsx/horizontalStyle.js"

test("Testing horizintal table style to json", () => {
  const table = [
    ["", "ligne1", "ligne2"],
    ["a", "vl1a", "vl2a"],
    ["b", "vl1b", "vl2b"],
  ]
  const ret = parser(table)
  expect(ret.a["ligne1"]).toEqual("vl1a")
})

test("Testing horizintal table style to json 2", () => {
  const table = [
    ["", "ligne1", "ligne2"],
    ["a", "vl1a", "vl2a"],
    ["b", "vl1b", "vl2b"],
  ]
  const keyAdapter = (key) => {
    const a = { ligne1: "bla" }
    return a[key]
  }
  const ret = parser(table, { keyAdapter })
  expect(ret.a["bla"]).toEqual("vl1a")
})

test("Testing horizintal table style to json 3", () => {
  const table = [
    ["", "ligne1", "ligne2"],
    ["a", "vl1a", "vl2a"],
    ["b", "vl1b", "vl2b"],
  ]
  const headAdapter = (key) => {
    const a = { a: "dodo" }
    return a[key]
  }
  const ret = parser(table, { headAdapter })
  expect(ret.dodo["ligne1"]).toEqual("vl1a")
})
