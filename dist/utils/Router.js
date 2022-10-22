"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _Route = require("./Route");

var _RouteSource = require("./RouteSource");

const store = [];

class Router {
  static get() {
    return Router.factory('get', arguments);
  }

  static post() {
    return Router.factory('post', arguments);
  }

  static patch() {
    return Router.factory('patch', arguments);
  }

  static delete() {
    return Router.factory('delete', arguments);
  }

  static put() {
    return Router.factory('put', arguments);
  }

  static factory(httpVerb, args) {
    const [routePath, routeSourceStr] = args;
    const routeSource = new _RouteSource.RouteSource(routeSourceStr);
    const route = new _Route.Route(httpVerb, routePath, routeSource);
    store.push(route);
    return route;
  }

  static draw(app) {
    store.forEach(route => {
      const routeArgs = [route.path];
      const action = route.source.controller[route.source.action];

      if (typeof route.source.middleware === 'function') {
        routeArgs.push([function (req, res, next) {
          route.source.middleware.apply(this, arguments);
          next();
        }]);
      }

      if (!(typeof action === 'function')) {
        throw new Error('App:Router Error - Unresolved action for controller');
      }

      routeArgs.push(action);
      app[route.verb].apply(app, routeArgs);
    });
  }

}

exports.Router = Router;