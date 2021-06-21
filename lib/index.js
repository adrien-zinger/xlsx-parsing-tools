"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cleaner = {
  expanseDot: _expanseDots["default"]
};
exports.cleaner = cleaner;
//# sourceMappingURL=index.js.map