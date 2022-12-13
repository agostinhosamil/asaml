"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthMiddleware = void 0;

var _Auth = require("../../utils/Auth");

var _User = require("../models/User");

var _AppMiddleware = require("./AppMiddleware");

class AuthMiddleware extends _AppMiddleware.AppMiddleware {
  root() {
    console.log('Hi, I am a middleware');
  }

  async jwt(request, response) {
    // some jwt implementation
    const auth = await _Auth.Auth.authenticate(request);

    if (auth) {
      const user = await _User.User.find(auth.user);
      request.user = user;
    } else {
      response.status(401).json({
        error: 'Unauthenticated',
        message: 'Firstly, you have to login'
      }).end();
    }
  }

}

exports.AuthMiddleware = AuthMiddleware;