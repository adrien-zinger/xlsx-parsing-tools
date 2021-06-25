import { xlsxParser, xlsxMdPrint } from './parse-xlsx/index.js'
import expanseDot from './json-cleaner/expanse-dots.js'
import hTableToJson from './parse-xlsx/horizontalStyle'

const cleaner = {
  expanseDot,
}

export { xlsxMdPrint, xlsxParser, cleaner, hTableToJson }
