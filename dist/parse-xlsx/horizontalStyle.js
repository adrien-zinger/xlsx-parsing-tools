"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getJsonFromTable;

// Parse table horizontal style. Get json

/*

       |   A  |  B
  Name | val1 | val2

=>
{
  "Name": {
    "A": "val1",
    "B": "val2"
  }
}
*/

/**
 * @typedef AdapterObject
 * @type {object}
 */

/**
 * Transforms a two dimensional table in a json object
 * @param {*} table
 * @param {object} adapters
 * @returns json object of a two dimensional table
 */
function getJsonFromTable(table) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      valueAdapter = _ref.valueAdapter,
      keyAdapter = _ref.keyAdapter,
      headAdapter = _ref.headAdapter,
      id = _ref.id;

  if (keyAdapter === undefined) keyAdapter = function keyAdapter(key) {
    return key;
  };
  if (headAdapter === undefined) headAdapter = function headAdapter(head) {
    return head;
  };
  if (valueAdapter === undefined) valueAdapter = function valueAdapter(value, _ref2) {
    var key = _ref2.key,
        head = _ref2.head,
        id = _ref2.id;
    return value;
  };
  var out = {};
  var keyLine = {}; // Map of key: linenumber - value: linekey

  var keyCount = {}; // Add a number if two lines have same name
  // fill keyLine with keys

  for (var i = 0; i < table[0].length; ++i) {
    if (table[0][i] !== '') {
      var key = keyAdapter(table[0][i], id);
      if (key === undefined) continue;

      if (keyCount[key] === undefined) {
        keyCount[key] = 1;
        keyLine[i] = key;
      } else {
        keyLine[i] = key + ++keyCount[key];
      }
    }
  }

  for (var _i = 1; _i < table.length; ++_i) {
    var arr = table[_i]; // column array of values

    var head = headAdapter(arr[0], id);
    if (head === undefined) continue;
    out[head] = {};

    for (var j = 1; j < arr.length; ++j) {
      if (keyLine[j] !== undefined) out[head][keyLine[j]] = valueAdapter(arr[j], {
        head: head,
        key: keyLine[j],
        id: id
      });
    }
  }

  return out;
}