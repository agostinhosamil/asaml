"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = exports.default = void 0;

var _Helper = require("../utils/Helper");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const setup = [_Helper.Helper.setupModels(), /*#__PURE__*/_asyncToGenerator(function* () {
  'use strict';
})];
exports.setup = setup;

var _default = setup.map(callback => callback instanceof Promise ? callback : callback());

exports.default = _default;