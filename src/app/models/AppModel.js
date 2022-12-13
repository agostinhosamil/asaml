import { Helper } from '@utils/Helper'
// import { asyncToGenerator } from '@utils/asyncToGenerator'
import { ModelDataObject } from '@utils/ModelDataObject'

const store = {}

const createdSymbol = Symbol('created')

export class AppModel {
  [createdSymbol] = false

  constructor (data) {
    if (typeof data === 'object') {
      Object.assign(this, data)
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

  static registerModuleDataObject (modelDataObject) {
    const adapter = this.adapter || 'mongo'

    store[this.name] = new ModelDataObject(modelDataObject, this, adapter)

    const crudMethods = [
      // CREATE
      'create',
      // READ
      'all',
      'findAll',
      'where',
      'find',
      'read',
      // UPDATE
      'update',
      'updateById',
      'updateBy',
      // DELETE
      'delete',
      'deleteById',
      'deleteBy'
    ]

    crudMethods
      .forEach(crudMethod => {
        this[crudMethod] = async (...args) => {
          const result = store[this.name][crudMethod].apply(store[this.name], args)

          if (result instanceof Promise) {
            return await result
          }

          return result
        }
      })
  }

  // CRUD
  static async create () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.create(...arguments)

      return result
    }
  }

  static async all () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.all(...arguments)

      return result
    }
  }

  static async findAll () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.findAll(...arguments)

      return result
    }
  }

  static async where () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.where(...arguments)

      return result
    }
  }

  static async find () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.find(...arguments)

      return result
    }
  }

  static async read () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.read(...arguments)

      return result
    }
  }

  static async update () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.update(...arguments)

      return result
    }
  }

  static async updateById () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.updateById(...arguments)

      return result
    }
  }

  static async updateBy () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.updateBy(...arguments)

      return result
    }
  }

  static async delete () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.delete(...arguments)

      return result
    }
  }

  static async deleteById () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.deleteById(...arguments)

      return result
    }
  }

  static async deleteBy () {
    const modelDataObject = await this._getModelObject()

    if (modelDataObject) {
      const result = await this.deleteBy(...arguments)

      return result
    }
  }

  // END CRUD

  static async _getModelObject () {
    if (!store[this.name]) {
      await Helper.setupModels()
    }

    return store[this.name]
  }

  static get _registered () {
    return Boolean(store[this.name])
  }

  get _className () {
    return this.constructor.name
  }

  created () {
    return Boolean(this[createdSymbol])
  }

  async save () {
    const data = {}

    Object.keys(this).forEach(key => {
      data[key] = this[key]
    })

    const record = await this.constructor.create(data)

    if (record) {
      Object.assign(this, record)

      this[createdSymbol] = true
    }

    return record
  }
}
