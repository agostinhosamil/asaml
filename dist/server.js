"use strict";

require("./config/routes");

var _app = _interopRequireDefault(require("./app"));

var _log = require("./config/log");

var _setup = _interopRequireDefault(require("./config/setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 3000;

const main = async () => {
  if (_setup.default instanceof Array) {
    await Promise.all(_setup.default);
  }

  _app.default.listen(PORT, () => (0, _log.log)('Server running'));
};

main();