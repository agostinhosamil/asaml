import path from 'path'
import fs from 'fs'

import config from '../config/config'

export class RouteSource {
  middleware = null
  controller = null 
  action = null

  constructor (sourceStr) {
    // sourceStr ~= middlewareClass:method@controller/action
    const re = /([a-zA-Z0-9:_]*)@([a-zA-Z0-9:_]+)\/([a-zA-Z0-9:_]*)/i

    const [_, middlewareStr, controllerName, action] = sourceStr.match (re)

    const controller = this.resolveController (controllerName)
    const middleware = this.resolveMiddleware (middlewareStr)
    
    Object.assign (this, { middleware, controller, action })
  }

  resolveController (controllerName) {
    const controllerPath = path.resolve (
      config.controllersPath,
      `${this._title (controllerName)}Controller.js` 
    )

    try {

      if (fs.existsSync (controllerPath)) {
        const controllerModuleObject = require (controllerPath)
        
        const controllerDataObject = controllerModuleObject[Object.keys (controllerModuleObject)[0]]

        if (this._isClass (controllerDataObject)) {
          return new controllerDataObject          
        }
      } else {
        this._errNotResolvedController (controllerName)
      }

    } catch (err) {
      this._errNotResolvedController (controllerName)
    }
  }

  resolveMiddleware (middlewareStr) {
    if (!/\S/.test(middlewareStr.toString ())) {
      return
    }

    const [middlewareName, middlewareAction] = middlewareStr.split (/\s*:\s*/)

    const middlewarePath = path.resolve (
      config.middlewaresPath,
      `${this._title (middlewareName)}Middleware.js` 
    )
  
    try {
  
      if (fs.existsSync (middlewarePath)) {
        const middlewareModuleObject = require (middlewarePath)

        if (Object.keys (middlewareModuleObject).length >= 1) {
          const middlewareDataObject = middlewareModuleObject[Object.keys (middlewareModuleObject)[0]]
  
          if (this._isClass (middlewareDataObject)) {
            const middleware = new middlewareDataObject
            
            if (typeof middleware [middlewareAction] === 'function') {
              return middleware [middlewareAction]
            }
          }
        }
      } else {
        this._errNotResolvedMiddleware (middlewareName)
      }
  
    } catch (err) {
      this._errNotResolvedMiddleware (middlewareName)
    }
  }

  _errNotResolvedController (controllerName) {
    throw new Error (`AppController: could not resolve controller '${controllerName}'`)
  }

  _errNotResolvedMiddleware (middlewareName) {
    throw new Error (`AppMiddleware: could not resolve middleware '${middlewareName}'`)
  }

  _isClass (object) {
    return typeof object === 'function' && /^class/i.test(object.toString ())
  }

  _title (str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
  }
}
