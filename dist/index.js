"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleaner = exports.xlsxParser = exports.xlsxMdPrint = undefined;

var _index = require("./parse-xlsx/index.js");

var _expanseDots = require("./json-cleaner/expanse-dots.js");

var _expanseDots2 = (0, _interopRequireDefault2["default"])(_expanseDots);

var cleaner = {
  expanseDot: _expanseDots2["default"]
};
exports.xlsxMdPrint = _index.xlsxMdPrint;
exports.xlsxParser = _index.xlsxParser;
exports.cleaner = cleaner;
//# sourceMappingURL=index.js.map