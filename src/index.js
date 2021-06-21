import { xlsxParser, xlsxMdPrint } from "./parse-xlsx/index.js"
import expanseDot from "./json-cleaner/expanse-dots.js"

const cleaner = {
  expanseDot,
}

export { xlsxMdPrint, xlsxParser, cleaner }
