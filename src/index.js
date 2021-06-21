import { xlsxParser, xlsxMdPrint } from "./src/parse-xlsx/index.js"
import expanseDot from "./src/json-cleaner/expanse-dots.js"

const cleaner = {
  expanseDot,
}

export { xlsxMdPrint, xlsxParser, cleaner }
