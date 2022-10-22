"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(process.env.ATLAS_URI);

_mongoose.default.promise = global.Promise; // mongoose.disconnect()

var _default = _mongoose.default;
exports.default = _default;