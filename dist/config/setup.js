"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = exports.default = void 0;

var _Helper = require("../utils/Helper");

const setup = [_Helper.Helper.setupModels(), async () => {
  'use strict';
}];
exports.setup = setup;

var _default = setup.map(callback => callback instanceof Promise ? callback : callback());

exports.default = _default;