import { xlsxParser, xlsxMdPrint } from './parse-xlsx/index.js'
import expanseDot from './json-cleaner/expanse-dots.js'
import hTableToJson from './parse-xlsx/horizontalStyle'

const cleaner = {
  /**
   * Expanse keys with dots in objects object
   * @example { 'a.b' = 'c' } => { 'a': { 'b': 'c' } }
   * @param {object} obj object with wrong keys
   * @returns expensed object
   */
  expanseDot,
}

export { xlsxMdPrint, xlsxParser, cleaner, hTableToJson }
