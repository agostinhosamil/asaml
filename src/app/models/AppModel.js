const store = {}

export class AppModel extends Error {
  constructor (message) {
    super(message)

    this.name = this.constructor.name
  }

  static getAll () {
    console.log('Model Name => ', this.name)
  }

  static registerModuleDataObject (modelDataObject) {
    store[this.name] = modelDataObject
  }
}
