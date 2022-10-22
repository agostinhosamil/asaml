"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;

var _AppMiddleware = require("./AppMiddleware");

class AuthMiddleware extends _AppMiddleware.AppMiddleware {
  root() {
    console.log('Hi, I am a middleware');
  }

  jwt() {// some jwt implementation
  }

}

exports.AuthMiddleware = AuthMiddleware;