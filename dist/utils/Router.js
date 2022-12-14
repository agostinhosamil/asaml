"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _Route = require("./Route");

var _RouteSource = require("./RouteSource");

var _log = require("../config/log");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    const _args = _slicedToArray(args, 2),
          routePath = _args[0],
          routeSourceStr = _args[1];

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