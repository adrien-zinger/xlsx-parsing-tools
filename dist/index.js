"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "xlsxParser", {
  enumerable: true,
  get: function get() {
    return _index.xlsxParser;
  }
});
Object.defineProperty(exports, "xlsxMdPrint", {
  enumerable: true,
  get: function get() {
    return _index.xlsxMdPrint;
  }
});
exports.cleaner = void 0;

var _index = require("./parse-xlsx/index.js");

var _expanseDots = _interopRequireDefault(require("./json-cleaner/expanse-dots.js"));

var cleaner = {
  expanseDot: _expanseDots["default"]
};
exports.cleaner = cleaner;
//# sourceMappingURL=index.js.map