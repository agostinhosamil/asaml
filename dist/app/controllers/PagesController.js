"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesController = void 0;

var _AppController = require("./AppController");

class PagesController extends _AppController.AppController {
  index(req, res) {
    res.end('HEYEYE');
  }

  about(req, res) {
    res.end('<h1>About Page</h1>');
  }

}

exports.PagesController = PagesController;