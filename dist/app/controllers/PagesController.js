"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesController = void 0;

var _AppController = require("./AppController");

var _Auth = require("../../utils/Auth");

class PagesController extends _AppController.AppController {
  index(req, res) {
    res.end('Hey');
  }

  about(req, res) {
    res.end('<h1>About Page</h1>');
  }

  async login(req, res) {
    const {
      username,
      password
    } = req.body.user;
    const {
      user,
      token
    } = await _Auth.Auth.attempt({
      username,
      password
    });
    res.json({
      hey: 'Man',
      token,
      user
    });
  }

  async home(req, res) {
    res.json({
      authenticated: 'YAs',
      user: req.user
    });
  }

}

exports.PagesController = PagesController;