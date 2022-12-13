"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _bcryptjs = require("bcryptjs");

var _AppModel = require("./AppModel");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class User extends _AppModel.AppModel {
  static async beforeCreate() {
    if (this.password) {
      this.password = await (0, _bcryptjs.hash)(this.password, 8);
    }
  }

}

exports.User = User;

_defineProperty(User, "adapter", 'mysql');