"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteSource = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

    const _sourceStr$match$slic = sourceStr.match(re).slice(1, 4),
          _sourceStr$match$slic2 = _slicedToArray(_sourceStr$match$slic, 3),
          middlewareStr = _sourceStr$match$slic2[0],
          controllerName = _sourceStr$match$slic2[1],
          actionName = _sourceStr$match$slic2[2];

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

    const _middlewareStr$split = middlewareStr.split(/\s*:\s*/),
          _middlewareStr$split2 = _slicedToArray(_middlewareStr$split, 2),
          middlewareName = _middlewareStr$split2[0],
          middlewareAction = _middlewareStr$split2[1];

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