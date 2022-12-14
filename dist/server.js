"use strict";

require("./config/routes");

var _app = _interopRequireDefault(require("./app"));

var _log = require("./config/log");

var _setup = _interopRequireDefault(require("./config/setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const PORT = process.env.PORT || 3000;

const main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    if (_setup.default instanceof Array) {
      yield Promise.all(_setup.default);
    }

    _app.default.listen(PORT, () => (0, _log.log)('Server running'));
  });

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main();