const store =  {} 

export class AppModel extends Error {

  constructor (message) {
    super (message)

    this.name = this.constructor.name
  }

  static getAll () {
    const { database } = db

    console.log (database)

    console.log ('Model Name => ', this.name)
  }

  static registerModuleDataObject (modelDataObject) {
    store[this.name] = modelDataObject
  }
}
