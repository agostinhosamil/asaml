const store = {}

export class AppModel extends Error {
  constructor (message) {
    super(message)

    this.name = this.constructor.name
  }

  static async getAll () {
    const modelObject = this._getModelObject()

    try {
      const records = await modelObject.find({})

      return records
    } catch (err) {
      return []
    }
  }

  static async create (data) {
    const modelObject = this._getModelObject()

    try {
      const records = await modelObject.create(data)

      return records
    } catch (err) {
      return null
    }
  }

  static registerModuleDataObject (modelDataObject) {
    store[this.name] = modelDataObject
  }

  static _getModelObject () {
    return store[this.name]
  }
}
