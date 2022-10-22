"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = require("body-parser");

var _express = require("express");

var _cors2 = _interopRequireDefault(require("./cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [(0, _express.json)(), (0, _bodyParser.urlencoded)({
  extended: false
}), (0, _cors.default)(_cors2.default)];
exports.default = _default;