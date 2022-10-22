"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Helper = require("../utils/Helper");

var _default = _Helper.Helper.corsOptions({
  origin: ['localhost']
});

exports.default = _default;