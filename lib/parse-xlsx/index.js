"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlsxParser = xlsxParser;
exports.xlsxMdPrint = xlsxMdPrint;

var _xlsx = _interopRequireDefault(require("xlsx"));

var _alphabet = require("./alphabet.js");

var _config2 = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 * @param {XLSX.WorkSheet} worksheet
 * @param {*} letter_lim
 * @param {*} num_lim
 * @param {*} filter
 * @returns
 */
function graps(worksheet, _ref, map) {
  var _ref2 = _slicedToArray(_ref, 4),
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

  for (var _i2 = 0; _i2 < width; ++_i2) {
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

  for (var _i3 = 0, _column_to_remove = column_to_remove; _i3 < _column_to_remove.length; _i3++) {
    var c = _column_to_remove[_i3];
    table.splice(c, 1);
  }

  for (var _i4 = 0, _lines_to_remove = lines_to_remove; _i4 < _lines_to_remove.length; _i4++) {
    var l = _lines_to_remove[_i4];

    var _iterator2 = _createForOfIteratorHelper(table),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _c = _step2.value;

        _c.splice(l, 1);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
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
  if (config === undefined) config = _config2["default"];
  return new Promise(function (res) {
    var ret = [];

    var workbook = _xlsx["default"].readFile(path);

    var _config = config,
        sheetignore = _config.sheetignore,
        limits = _config.limits;

    var _iterator3 = _createForOfIteratorHelper(workbook.SheetNames),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var name = _step3.value;
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
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    res(ret);
  });
}
//# sourceMappingURL=index.js.map