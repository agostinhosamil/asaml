"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Router = require("./utils/Router");

var _middlewares = _interopRequireDefault(require("./config/middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_middlewares.default.map(middleware => app.use(middleware));

_Router.Router.draw(app);

var _default = app;
exports.default = _default;