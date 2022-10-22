import { Helper } from '@utils/Helper'

const store = {}
export class AppModel extends Error {
  constructor (message) {
    super(message)

    this.name = this.constructor.name
  }

  static async findAll () {
    const modelObject = await this._getModelObject()

    try {
      const records = await modelObject.find({})

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

  static async deleteMany () {}
  static async deleteOne () {}

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

  static registerModuleDataObject (modelDataObject) {
    store[this.name] = modelDataObject
  }

  static async _getModelObject () {
    if (!store[this.name]) {
      await Helper.setupModels()
    }

    return store[this.name]
  }
}
