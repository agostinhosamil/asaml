"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesController = void 0;

var _AppController = require("./AppController");

var _Auth = require("../../utils/Auth");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PagesController extends _AppController.AppController {
  index(req, res) {
    res.end('Hey');
  }

  about(req, res) {
    res.end('<h1>About Page</h1>');
  }

  login(req, res) {
    return _asyncToGenerator(function* () {
      const _req$body$user = req.body.user,
            username = _req$body$user.username,
            password = _req$body$user.password;

      const _yield$Auth$attempt = yield _Auth.Auth.attempt({
        username,
        password
      }),
            user = _yield$Auth$attempt.user,
            token = _yield$Auth$attempt.token;

      res.json({
        hey: 'Man',
        token,
        user
      });
    })();
  }

  home(req, res) {
    return _asyncToGenerator(function* () {
      res.json({
        authenticated: 'YAs',
        user: req.user
      });
    })();
  }

}

exports.PagesController = PagesController;