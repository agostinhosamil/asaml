"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _User = require("../models/User");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UsersController {
  index(req, res) {
    return _asyncToGenerator(function* () {
      const users = yield _User.User.all();
      res.json(users);
    })();
  }

  store(req, res) {
    return _asyncToGenerator(function* () {
      const userData = req.body.user;
      const user = yield _User.User.create(userData);
      return res.json(user);
    })();
  }

  show(req, res) {
    return _asyncToGenerator(function* () {
      const id = req.params.id;
      const user = yield _User.User.find(id);
      res.json(user);
    })();
  }

}

exports.UsersController = UsersController;