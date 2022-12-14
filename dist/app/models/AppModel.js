"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModel = void 0;

var _Helper = require("../../utils/Helper");

var _ModelDataObject = require("../../utils/ModelDataObject");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const store = {};
const createdSymbol = Symbol('created');

class AppModel {
  constructor(data) {
    _defineProperty(this, createdSymbol, false);

    if (typeof data === 'object') {
      Object.assign(this, data);
    }
  }
  /*
  static async findAll () {
    const modelObject = await this._getModelObject()
      try {
      const records = await modelObject.findAll()
        return records
    } catch (err) {
      return []
    }
  }
    static async count () {
    const modelObject = await this._getModelObject()
      try {
      const records = modelObject.find({})
        return await records.countDocuments()
    } catch (err) {
      return []
    }
  }
    static async all () {
    return await this.findAll()
  }
    static async create (data) {
    const modelObject = await this._getModelObject()
      try {
      const records = await modelObject.create(data)
        return records
    } catch (err) {
      // console.log(err)
      return null
    }
  }
    static async deleteMany () { }
  static async deleteOne () { }
    static async find (recordId) {
    const modelObject = await this._getModelObject()
      try {
      if (typeof recordId !== typeof undefined) {
        const record = modelObject.findOne({ _id: recordId })
          return record
      }
    } catch (err) {
      return null
    }
  }
    static async findById () {
    return await this.find.apply(this, arguments)
  }
    static async where () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.where.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findByIdAndDelete () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findByIdAndDelete.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findByIdAndRemove () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findByIdAndRemove.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findByIdAndUpdate () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findByIdAndUpdate.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findOne () {
    return await this.find.apply(this, arguments)
  }
    static async findOneAndDelete () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findOneAndDelete.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findOneAndRemove () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findOneAndRemove.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findOneAndReplace () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findOneAndReplace.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async findOneAndUpdate () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.findOneAndUpdate.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async replaceOne () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.replaceOne.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async updateMany () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.updateMany.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
    static async updateOne () {
    const modelObject = await this._getModelObject()
      try {
      const queryResult = await modelObject.updateOne.apply(modelObject, arguments)
        return queryResult
    } catch (err) {
      return null
    }
  }
  */


  static registerModuleDataObject(modelDataObject) {
    var _this = this;

    const adapter = this.adapter || 'mongo';
    store[this.name] = new _ModelDataObject.ModelDataObject(modelDataObject, this, adapter);
    const crudMethods = [// CREATE
    'create', // READ
    'all', 'findAll', 'where', 'find', 'read', // UPDATE
    'update', 'updateById', 'updateBy', // DELETE
    'delete', 'deleteById', 'deleteBy'];
    crudMethods.forEach(crudMethod => {
      this[crudMethod] = /*#__PURE__*/_asyncToGenerator(function* (...args) {
        const result = store[_this.name][crudMethod].apply(store[_this.name], args);

        if (result instanceof Promise) {
          return yield result;
        }

        return result;
      });
    });
  } // CRUD


  static create() {
    var _arguments = arguments,
        _this2 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this2._getModelObject();

      if (modelDataObject) {
        const result = yield _this2.create(..._arguments);
        return result;
      }
    })();
  }

  static all() {
    var _arguments2 = arguments,
        _this3 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this3._getModelObject();

      if (modelDataObject) {
        const result = yield _this3.all(..._arguments2);
        return result;
      }
    })();
  }

  static findAll() {
    var _arguments3 = arguments,
        _this4 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this4._getModelObject();

      if (modelDataObject) {
        const result = yield _this4.findAll(..._arguments3);
        return result;
      }
    })();
  }

  static where() {
    var _arguments4 = arguments,
        _this5 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this5._getModelObject();

      if (modelDataObject) {
        const result = yield _this5.where(..._arguments4);
        return result;
      }
    })();
  }

  static find() {
    var _arguments5 = arguments,
        _this6 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this6._getModelObject();

      if (modelDataObject) {
        const result = yield _this6.find(..._arguments5);
        return result;
      }
    })();
  }

  static read() {
    var _arguments6 = arguments,
        _this7 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this7._getModelObject();

      if (modelDataObject) {
        const result = yield _this7.read(..._arguments6);
        return result;
      }
    })();
  }

  static update() {
    var _arguments7 = arguments,
        _this8 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this8._getModelObject();

      if (modelDataObject) {
        const result = yield _this8.update(..._arguments7);
        return result;
      }
    })();
  }

  static updateById() {
    var _arguments8 = arguments,
        _this9 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this9._getModelObject();

      if (modelDataObject) {
        const result = yield _this9.updateById(..._arguments8);
        return result;
      }
    })();
  }

  static updateBy() {
    var _arguments9 = arguments,
        _this10 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this10._getModelObject();

      if (modelDataObject) {
        const result = yield _this10.updateBy(..._arguments9);
        return result;
      }
    })();
  }

  static delete() {
    var _arguments10 = arguments,
        _this11 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this11._getModelObject();

      if (modelDataObject) {
        const result = yield _this11.delete(..._arguments10);
        return result;
      }
    })();
  }

  static deleteById() {
    var _arguments11 = arguments,
        _this12 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this12._getModelObject();

      if (modelDataObject) {
        const result = yield _this12.deleteById(..._arguments11);
        return result;
      }
    })();
  }

  static deleteBy() {
    var _arguments12 = arguments,
        _this13 = this;

    return _asyncToGenerator(function* () {
      const modelDataObject = yield _this13._getModelObject();

      if (modelDataObject) {
        const result = yield _this13.deleteBy(..._arguments12);
        return result;
      }
    })();
  } // END CRUD


  static _getModelObject() {
    var _this14 = this;

    return _asyncToGenerator(function* () {
      if (!store[_this14.name]) {
        yield _Helper.Helper.setupModels();
      }

      return store[_this14.name];
    })();
  }

  static get _registered() {
    return Boolean(store[this.name]);
  }

  get _className() {
    return this.constructor.name;
  }

  created() {
    return Boolean(this[createdSymbol]);
  }

  save() {
    var _this15 = this;

    return _asyncToGenerator(function* () {
      const data = {};
      Object.keys(_this15).forEach(key => {
        data[key] = _this15[key];
      });
      const record = yield _this15.constructor.create(data);

      if (record) {
        Object.assign(_this15, record);
        _this15[createdSymbol] = true;
      }

      return record;
    })();
  }

}

exports.AppModel = AppModel;