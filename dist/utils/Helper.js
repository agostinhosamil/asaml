"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helper = void 0;

var _path = _interopRequireDefault(require("path"));

var _promises = _interopRequireDefault(require("fs/promises"));

var _config = _interopRequireDefault(require("../config"));

var _database = _interopRequireDefault(require("../config/database"));

var _Adapters = _interopRequireDefault(require("./ModelDataObject/Adapters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const setupDoneSymbol = Symbol('setupDone');

class Helper {
  static corsOptions(corsOptions) {
    Object.keys(corsOptions).forEach(key => {
      const keyReader = `_readCors${Helper.title(key)}`;

      if (typeof Helper[keyReader] === 'function') {
        corsOptions[key] = Helper[keyReader](corsOptions[key]);
      }
    });
    return corsOptions;
  }

  static _readCorsOrigin(origin) {
    if (origin instanceof Array) {
      return (requestOrigin, callback) => {
        if (origin.indexOf(requestOrigin) !== -1 || !requestOrigin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      };
    }

    return origin;
  }

  static title(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

  static isEmail(data) {
    const re = /^(.+)@(.+)$/;
    return typeof data === typeof 'str' && re.test(data);
  }

  static isClass(object) {
    return typeof object === 'function' && /^class/i.test(object.toString());
  }

  static setupModels() {
    return _asyncToGenerator(function* () {
      const modelsFileList = yield _promises.default.readdir(_config.default.modelsPath);
      modelsFileList.filter(modelFile => !/^(AppModel\.js)$/.test(modelFile)).forEach(modelFile => {
        const modelFilePath = _path.default.join(_config.default.modelsPath, modelFile);

        const modelName = modelFile.replace(/\.js$/i, '');

        const modelModuleObject = require(modelFilePath);

        const modelClassObject = modelModuleObject[modelName];

        if (modelClassObject._registered) {
          return null;
        }

        if (Helper.isClass(modelClassObject) && typeof modelClassObject.registerModuleDataObject === 'function') {
          // console.log (modelClassObject)
          const modelAdapter = typeof modelClassObject.adapter === typeof 'str' ? modelClassObject.adapter : _database.default.adapter;

          if (_Adapters.default.defined(modelAdapter)) {
            _Adapters.default[modelAdapter].setupModel({
              modelClassObject,
              modelFile
            });
          }
        }
      });
      Helper[setupDoneSymbol] = true;
    })();
  }

  static ModelsSetupDone() {
    return Boolean(Helper[setupDoneSymbol]);
  }

}

exports.Helper = Helper;