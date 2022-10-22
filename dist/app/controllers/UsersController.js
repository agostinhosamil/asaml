"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersController = void 0;

var _User = require("../models/User");

class UsersController {
  async index(req, res) {
    const users = await _User.User.all();
    res.json(users);
  }

  async store(req, res) {
    const {
      user: userData
    } = req.body;
    const user = await _User.User.create(userData);
    return res.json(user);
  }

  async show(req, res) {
    const {
      id
    } = req.params;
    const user = await _User.User.find(id);
    res.json(user);
  }

}

exports.UsersController = UsersController;