"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlphabetSerie = getAlphabetSerie;
exports.alphabet = void 0;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen);

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
exports.alphabet = alphabet;

function gen(start) {
  var index, alen;
  return regeneratorRuntime.wrap(function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = alphabet.indexOf(start);
          alen = alphabet.length;

        case 2:
          if (!true) {
            _context.next = 13;
            break;
          }

          if (!(index >= alen)) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return alphabet[Math.floor(index / alen) - 1] + alphabet[index % alen];

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return alphabet[index];

        case 10:
          index++;
          _context.next = 2;
          break;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function getAlphabetSerie() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "A";
  return gen(start);
}
//# sourceMappingURL=alphabet.js.map