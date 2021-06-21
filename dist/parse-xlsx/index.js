"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeEmpties = exports.xlsxMdPrint = exports.xlsxParser = undefined;

var _slicedToArray2 = require("@babel/runtime/helpers/slicedToArray");

var _slicedToArray3 = (0, _interopRequireDefault2["default"])(_slicedToArray2);

var _xlsx = require("xlsx");

var _xlsx2 = (0, _interopRequireDefault2["default"])(_xlsx);

var _alphabet = require("./alphabet.js");

var _config2 = require("./config.js");

var _config3 = (0, _interopRequireDefault2["default"])(_config2);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 *
 * @param {XLSX.WorkSheet} worksheet
 * @param {*} letter_lim
 * @param {*} num_lim
 * @param {*} filter
 * @returns
 */
function graps(worksheet, _ref, map) {
  var _ref2 = (0, _slicedToArray3["default"])(_ref, 4),
      letter_start = _ref2[0],
      letter_end = _ref2[1],
      num_start = _ref2[2],
      num_end = _ref2[3];

  var ret = [];
  var serie = (0, _alphabet.getAlphabetSerie)(letter_start);

  var _iterator = _createForOfIteratorHelper(serie),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var letter = _step.value;
      var col = [];

      for (var num = num_start; num <= num_end; ++num) {
        col.push(map(worksheet["".concat(letter).concat(num)], "".concat(letter).concat(num)));
        if (num_end === num) break;
      }

      ret.push(col);
      if (letter_end === letter) return ret;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function xlsxMdPrint(table, cb) {
  function replaceLineJump(str) {
    return str.split("").map(function (c) {
      if (c === "\n") return "\\n";
      if (c === "\r") return "";
      if (c === "\t") return "";
      return c;
    }).join("");
  }

  var height = table[0].length;
  var width = table.length;
  var out = "|";
  var serie = (0, _alphabet.getAlphabetSerie)();

  for (var i = 0; i < width; ++i) {
    out += " ".concat(serie.next().value, " |");
  }

  out += "\n|";

  for (var _i = 0; _i < width; ++_i) {
    out += " ------ |";
  }

  for (var x = 0; x < height; ++x) {
    out += "\n|";

    for (var y = 0; y < width; ++y) {
      out += " ".concat(replaceLineJump(table[y][x]), " |");
    }
  }

  cb(out += "\n");
}

function removeEmpties(table) {
  var height = table[0].length;
  var width = table.length;
  var lines_to_remove = [];
  var column_to_remove = [];

  for (var x = 0; x < height; ++x) {
    var rm = true;

    for (var y = 0; y < width; ++y) {
      if (table[y][x] != "") {
        rm = false;
        break;
      }
    }

    if (rm) lines_to_remove.push(x);
  }

  for (var _y = 0; _y < width; ++_y) {
    var _rm = true;

    for (var _x = 0; _x < height; ++_x) {
      if (table[_y][_x] != "") {
        _rm = false;
        continue;
      }
    }

    if (_rm) column_to_remove.push(_y);
  }

  table = table.filter(function (val, index) {
    return column_to_remove.indexOf(index) === -1;
  });

  for (var i = 0; i < table.length; ++i) {
    table[i] = table[i].filter(function (val, index) {
      return lines_to_remove.indexOf(index) === -1;
    });
  }

  return table;
}
/**
 *
 * @param {*} config
 * @returns {Promise}
 */


function xlsxParser(path) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (config === undefined) config = _config3["default"];
  return new Promise(function (res) {
    var ret = [];

    var workbook = _xlsx2["default"].readFile(path);

    var _config = config,
        sheetignore = _config.sheetignore,
        limits = _config.limits;

    var _iterator2 = _createForOfIteratorHelper(workbook.SheetNames),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var name = _step2.value;
        if (sheetignore.length > 0 && sheetignore.indexOf(name) >= 0) continue;
        var worksheet = workbook.Sheets[name];
        var lims = limits[name] !== undefined ? limits[name] : limits["default"];
        var table = graps(worksheet, lims, function (cell) {
          return cell === undefined ? "" : cell.v;
        });
        ret.push({
          sheetpage: name,
          data: removeEmpties(table)
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    res(ret);
  });
}

exports.xlsxParser = xlsxParser;
exports.xlsxMdPrint = xlsxMdPrint;
exports.removeEmpties = removeEmpties;
//# sourceMappingURL=index.js.map