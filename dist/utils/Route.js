"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;

class Route {
  constructor(httpVerb, path, source) {
    Object.assign(this, {
      verb: httpVerb.toLowerCase(),
      path,
      source
    });
  }

}

exports.Route = Route;