"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;

var _Auth = require("../../utils/Auth");

var _User = require("../models/User");

var _AppMiddleware = require("./AppMiddleware");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AuthMiddleware extends _AppMiddleware.AppMiddleware {
  root() {
    console.log('Hi, I am a middleware');
  }

  jwt(request, response) {
    return _asyncToGenerator(function* () {
      // some jwt implementation
      const auth = yield _Auth.Auth.authenticate(request);

      if (auth) {
        const user = yield _User.User.find(auth.user);
        request.user = user;
      } else {
        response.status(401).json({
          error: 'Unauthenticated',
          message: 'Firstly, you have to login'
        }).end();
      }
    })();
  }

}

exports.AuthMiddleware = AuthMiddleware;