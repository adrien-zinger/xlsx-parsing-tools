"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = expanseDots;

function containDot(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] === '.') return i;
  }

  return -1;
}
/**
 * Expanse keys with dots in objects object
 * @example { 'a.b' = 'c' } => { 'a': { 'b': 'c' } }
 * @param {object} obj object with wrong keys
 * @returns expensed object
 */


function expanseDots(obj) {
  var ret = {};

  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var i = containDot(key);

    if (i > 0) {
      var pre = key.slice(0, i);
      var suf = key.slice(i + 1);
      if (ret[pre] === undefined) ret[pre] = {};

      if (obj[key] instanceof Object) {
        ret[pre][suf] = expanseDots(obj[key]);
      } else {
        ret[pre][suf] = obj[key];
      }
    } else {
      if (obj[key] instanceof Object) {
        ret[key] = expanseDots(obj[key]);
      } else {
        ret[key] = obj[key];
      }
    }
  }

  return ret;
}