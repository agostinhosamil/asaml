"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteSource = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RouteSource {
  constructor(sourceStr) {
    _defineProperty(this, "middleware", null);

    _defineProperty(this, "controller", null);

    _defineProperty(this, "action", null);

    // sourceStr ~= middlewareClass:method@controller/action
    const re = /([a-zA-Z0-9:_]*)@([a-zA-Z0-9:_]+)(\/[a-zA-Z0-9:_]*)?/i;

    if (!re.test(sourceStr)) {
      return null;
    }

    const [middlewareStr, controllerName, actionName] = sourceStr.match(re).slice(1, 4);
    const controller = this.resolveController(controllerName);
    const middleware = this.resolveMiddleware(middlewareStr);
    const action = actionName ? actionName.replace(/^(\/)+/, '', actionName) : 'index';
    Object.assign(this, {
      middleware,
      controller,
      action
    });
  }

  resolveController(controllerName) {
    const controllerPath = _path.default.resolve(_config.default.controllersPath, `${this._title(controllerName)}Controller.js`);

    try {
      if (_fs.default.existsSync(controllerPath)) {
        const controllerModuleObject = require(controllerPath);

        const ControllerDataObject = controllerModuleObject[Object.keys(controllerModuleObject)[0]];

        if (this._isClass(ControllerDataObject)) {
          return new ControllerDataObject();
        }
      } else {
        this._errNotResolvedController(controllerName);
      }
    } catch (err) {
      this._errNotResolvedController(controllerName);
    }
  }

  resolveMiddleware(middlewareStr) {
    if (!/\S/.test(middlewareStr.toString())) {
      return;
    }

    const [middlewareName, middlewareAction] = middlewareStr.split(/\s*:\s*/);

    const middlewarePath = _path.default.resolve(_config.default.middlewaresPath, `${this._title(middlewareName)}Middleware.js`);

    try {
      if (_fs.default.existsSync(middlewarePath)) {
        const middlewareModuleObject = require(middlewarePath);

        if (Object.keys(middlewareModuleObject).length >= 1) {
          const MiddlewareDataObject = middlewareModuleObject[Object.keys(middlewareModuleObject)[0]];

          if (this._isClass(MiddlewareDataObject)) {
            const middleware = new MiddlewareDataObject();

            if (typeof middleware[middlewareAction] === 'function') {
              return middleware[middlewareAction];
            }
          }
        }
      } else {
        this._errNotResolvedMiddleware(middlewareName);
      }
    } catch (err) {
      this._errNotResolvedMiddleware(middlewareName);
    }
  }

  _errNotResolvedController(controllerName) {
    throw new Error(`AppController: could not resolve controller '${controllerName}'`);
  }

  _errNotResolvedMiddleware(middlewareName) {
    throw new Error(`AppMiddleware: could not resolve middleware '${middlewareName}'`);
  }

  _isClass(object) {
    return typeof object === 'function' && /^class/i.test(object.toString());
  }

  _title(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

}

exports.RouteSource = RouteSource;