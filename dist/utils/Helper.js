"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helper = void 0;

var _path = _interopRequireDefault(require("path"));

var _promises = _interopRequireDefault(require("fs/promises"));

var _config = _interopRequireDefault(require("../config"));

var _database = _interopRequireDefault(require("../config/database"));

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

  static isClass(object) {
    return typeof object === 'function' && /^class/i.test(object.toString());
  }

  static async setupModels() {
    const modelsFileList = await _promises.default.readdir(_config.default.modelsPath);
    modelsFileList.filter(modelFile => !/^(AppModel\.js)$/.test(modelFile)).map(async modelFile => {
      const modelFilePath = _path.default.join(_config.default.modelsPath, modelFile);

      const modelSchemaFilePath = _path.default.join(_config.default.schemasPath, [modelFile.replace(/((Schema)?\.js)$/i, ''), 'js'].join('.'));

      const modelName = modelFile.replace(/\.js$/i, '');

      const modelModuleObject = require(modelFilePath);

      const modelClassObject = modelModuleObject[modelName];

      if (Helper.isClass(modelClassObject) && typeof modelClassObject.registerModuleDataObject === 'function') {
        // console.log (modelClassObject)
        try {
          const modelSchemaObject = require(modelSchemaFilePath);

          const modelSchema = new _database.default.Schema(modelSchemaObject.default);
          Object.getOwnPropertyNames(modelClassObject).forEach(key => {
            const match = key.match(/^(post|pre)(.+)/i);

            if (match) {
              const [modelClassObjectMethodName, modelSchemaHookAdderMethodName
              /* pre, post */
              , modelSchemaHookName] = match;
              modelSchema[modelSchemaHookAdderMethodName.toLowerCase()](modelSchemaHookName.toLowerCase(), modelClassObject[modelClassObjectMethodName]);
            }
          });

          const modelDataObject = _database.default.model(modelName, modelSchema);

          modelClassObject.registerModuleDataObject(modelDataObject);
        } catch (err) {
          throw new Error(err);
        }
      }
    });
  }

}

exports.Helper = Helper;