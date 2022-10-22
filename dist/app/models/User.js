"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _bcryptjs = require("bcryptjs");

var _AppModel = require("./AppModel");

class User extends _AppModel.AppModel {
  static async preSave() {
    if (this.password) {
      this.password = await (0, _bcryptjs.hash)(this.password, 8);
    }
  }

}

exports.User = User;