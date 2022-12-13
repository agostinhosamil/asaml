"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _Route = require("./Route");

var _RouteSource = require("./RouteSource");

var _log = require("../config/log");

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

      const internalServerErrorHandler = (res, error) => {
        (0, _log.log)(error);
        res.status(500).json({
          error: 'Internal server error',
          message: 'Sorry! Some thing went wrong'
        }).end();
      };

      if (typeof route.source.middleware === 'function') {
        routeArgs.push([function (req, res, next) {
          try {
            const middlewareData = route.source.middleware.apply(this, arguments);

            if (middlewareData instanceof Promise) {
              middlewareData.then(() => {
                if (!res.finished) {
                  next();
                }
              }).catch(error => {
                internalServerErrorHandler(res, error);
              });
            } else {
              next();
            }
          } catch (error) {
            internalServerErrorHandler(res, error);
          }
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