"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppModel = void 0;

var _Helper = require("../../utils/Helper");

var _ModelDataObject = require("../../utils/ModelDataObject");

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
    const adapter = this.adapter || 'mongo';
    store[this.name] = new _ModelDataObject.ModelDataObject(modelDataObject, this, adapter);
    const crudMethods = [// CREATE
    'create', // READ
    'all', 'findAll', 'find', 'read', // UPDATE
    'update', 'updateById', 'updateBy', // DELETE
    'delete', 'deleteById', 'deleteBy'];
    crudMethods.forEach(crudMethod => {
      this[crudMethod] = async (...args) => {
        const result = store[this.name][crudMethod].apply(store[this.name], args);

        if (result instanceof Promise) {
          return await result;
        }

        return result;
      };
    });
  }

  static async _getModelObject() {
    if (!store[this.name]) {
      await _Helper.Helper.setupModels();
    }

    return store[this.name];
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

  async save() {
    const data = {};
    Object.keys(this).forEach(key => {
      data[key] = this[key];
    });
    const record = await this.constructor.create(data);

    if (record) {
      Object.assign(this, record);
      this[createdSymbol] = true;
    }

    return record;
  }

}

exports.AppModel = AppModel;