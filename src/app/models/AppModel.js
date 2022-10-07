const store = {}
export class AppModel extends Error {
  constructor (message) {
    super(message)

    this.name = this.constructor.name
  }

  static async findAll () {
    const modelObject = this._getModelObject()

    try {
      const records = await modelObject.find({})

      return records
    } catch (err) {
      return []
    }
  }

  static async count () {
    const modelObject = this._getModelObject()

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
    const modelObject = this._getModelObject()

    try {
      const records = await modelObject.create(data)

      return records
    } catch (err) {
      return null
    }
  }

  static async deleteMany () {}
  static async deleteOne () {}

  static async find (recordId) {
    const modelObject = this._getModelObject()

    try {
      if (typeof recordId !== typeof undefined) {
        const record = modelObject.findOne({ _id: recordId })

        return record
      }
    } catch (err) {
      return null
    }
  }

  // static async findById () {}
  static async where () {}
  static async findByIdAndDelete () {}
  static async findByIdAndRemove () {}
  static async findByIdAndUpdate () {}
  static async findOne () {}
  static async findOneAndDelete () {}
  static async findOneAndRemove () {}
  static async findOneAndReplace () {}
  static async findOneAndUpdate () {}
  static async replaceOne () {}
  static async updateMany () {}
  static async updateOne () {}

  static registerModuleDataObject (modelDataObject) {
    store[this.name] = modelDataObject
  }

  static _getModelObject () {
    return store[this.name]
  }
}
