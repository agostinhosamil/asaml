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

  static async setupModels() {
    const modelsFileList = await _promises.default.readdir(_config.default.modelsPath);
    modelsFileList.filter(modelFile => !/^(AppModel\.js)$/.test(modelFile)).map(async modelFile => {
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
  }

}

exports.Helper = Helper;