"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootPath = _path.default.resolve(__dirname, '..');

var _default = {
  controllersPath: _path.default.resolve(rootPath, 'app', 'controllers'),
  modelsPath: _path.default.resolve(rootPath, 'app', 'models'),
  middlewaresPath: _path.default.resolve(rootPath, 'app', 'middlewares'),
  helpersPath: _path.default.resolve(rootPath, 'app', 'helpers'),
  schemasPath: _path.default.resolve(rootPath, 'database', 'schemas')
};
exports.default = _default;