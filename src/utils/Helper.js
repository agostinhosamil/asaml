import path from 'path'
import fs from 'fs/promises'
import config from '@config/index'
import mongoose from '@config/database'

export class Helper {
  static corsOptions (corsOptions) {
    Object.keys(corsOptions).forEach(key => {
      const keyReader = `_readCors${Helper.title(key)}`

      if (typeof Helper[keyReader] === 'function') {
        corsOptions[key] = Helper[keyReader](corsOptions[key])
      }
    })

    return corsOptions
  }

  static _readCorsOrigin (origin) {
    if (origin instanceof Array) {
      return (requestOrigin, callback) => {
        if (origin.indexOf(requestOrigin) !== -1 || !requestOrigin) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    }

    return origin
  }

  static title (str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
  }

  static isEmail (data) {
    const re = /^(.+)@(.+)$/
    return typeof data === typeof 'str' && re.test(data)
  }

  static isClass (object) {
    return typeof object === 'function' && /^class/i.test(object.toString())
  }

  static async setupModels () {
    const modelsFileList = await fs.readdir(config.modelsPath)

    modelsFileList
      .filter(modelFile => !/^(AppModel\.js)$/.test(modelFile))
      .map(async modelFile => {
        const modelFilePath = path.join(config.modelsPath, modelFile)
        const modelSchemaFilePath = path.join(config.schemasPath, [modelFile.replace(/((Schema)?\.js)$/i, ''), 'js'].join('.'))
        const modelName = modelFile.replace(/\.js$/i, '')

        const modelModuleObject = require(modelFilePath)

        const modelClassObject = modelModuleObject[modelName]

        if (modelClassObject._registered) {
          return null
        }

        if (Helper.isClass(modelClassObject) &&
          typeof modelClassObject.registerModuleDataObject === 'function') {
          // console.log (modelClassObject)
          try {
            const modelSchemaObject = require(modelSchemaFilePath)
            const modelSchema = new mongoose.Schema(modelSchemaObject.default)

            Object.getOwnPropertyNames(modelClassObject).forEach(key => {
              const match = key.match(/^(post|pre)(.+)/i)

              if (match) {
                const [
                  modelClassObjectMethodName,
                  modelSchemaHookAdderMethodName /* pre, post */,
                  modelSchemaHookName
                ] = match

                modelSchema[modelSchemaHookAdderMethodName.toLowerCase()](
                  modelSchemaHookName.toLowerCase(),
                  modelClassObject[modelClassObjectMethodName]
                )
              }
            })

            const modelDataObject = mongoose.model(modelName, modelSchema)

            modelClassObject.registerModuleDataObject(modelDataObject)
          } catch (err) {
            throw new Error(err)
          }
        }
      })
  }
}
