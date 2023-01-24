import path from 'path'
import fs from 'fs'

import config from '~/config'

export class RouteSource {
  middleware = null
  controller = null
  action = null

  constructor (sourceStr) {
    const re = /([a-zA-Z0-9:_]*)@([a-zA-Z0-9:_]+)(\/[a-zA-Z0-9:_]*)?/i

    // sourceStr ~= middlewareClass:method@controller/action
    if (!re.test(sourceStr)) {
      return null
    }

    const [middlewareStr, controllerName, actionName] = sourceStr.match(re).slice(1, 4)

    const controller = this.resolveController(controllerName)
    const middleware = this.resolveMiddleware(middlewareStr)

    const action = actionName ? actionName.replace(/^(\/)+/, '', actionName) : 'index'

    Object.assign(this, { middleware, controller, action })
  }

  resolveController (controllerName) {
    const controllerPath = path.resolve(
      config.controllersPath,
      `${this._title(controllerName)}Controller.js`
    )

    try {
      if (fs.existsSync(controllerPath)) {
        const controllerModuleObject = require(controllerPath)

        const ControllerDataObject = controllerModuleObject[Object.keys(controllerModuleObject)[0]]

        if (this._isClass(ControllerDataObject)) {
          return new ControllerDataObject()
        }
      } else {
        this._errNotResolvedController(controllerName)
      }
    } catch (err) {
      this._errNotResolvedController(controllerName)
    }
  }

  resolveMiddleware (middlewareStr) {
    if (!/\S/.test(middlewareStr.toString())) {
      return
    }

    const [middlewareName, middlewareAction] = middlewareStr.split(/\s*:\s*/)

    const middlewarePath = path.resolve(
      config.middlewaresPath,
      `${this._title(middlewareName)}Middleware.js`
    )

    try {
      if (fs.existsSync(middlewarePath)) {
        const middlewareModuleObject = require(middlewarePath)

        if (Object.keys(middlewareModuleObject).length >= 1) {
          const MiddlewareDataObject = middlewareModuleObject[Object.keys(middlewareModuleObject)[0]]

          if (this._isClass(MiddlewareDataObject)) {
            const middleware = new MiddlewareDataObject()

            if (typeof middleware[middlewareAction] === 'function') {
              return middleware[middlewareAction]
            }
          }
        }
      } else {
        this._errNotResolvedMiddleware(middlewareName)
      }
    } catch (err) {
      this._errNotResolvedMiddleware(middlewareName)
    }
  }

  _errNotResolvedController (controllerName) {
    throw new Error(`AppController: could not resolve controller '${controllerName}'`)
  }

  _errNotResolvedMiddleware (middlewareName) {
    throw new Error(`AppMiddleware: could not resolve middleware '${middlewareName}'`)
  }

  _isClass (object) {
    return typeof object === 'function' && /^class/i.test(object.toString())
  }

  _title (str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
  }

  static merge (prefix, source) {
    const re = /(([a-zA-Z0-9_]*)(:([a-zA-Z0-9_]+))?)?((@([a-zA-Z0-9_]+))?(\/([a-zA-Z0-9_]+))?)?/i

    // const sourcePropMap = [
    //   2, // : 'middlewareName',
    //   4, // : 'middlewareAction',
    //   7, // : 'controllerName',
    //   9 // : 'controllerAction'
    // ]

    const sourcePropsMap = {
      middlewareName: 2,
      middlewareAction: 3,
      controllerName: 6,
      controllerAction: 8
    }

    const sourceProps = {}

    Array.from([prefix, source]).forEach(sourceStr => {
      const sourceData = sourceStr.match(re)

      Object.keys(sourcePropsMap).forEach(prop => {
        if (sourceData[sourcePropsMap[prop]]) {
          sourceProps[prop] = sourceData[sourcePropsMap[prop]]
        }
      })
    })

    Object.keys(sourcePropsMap).forEach(prop => {
      if (!sourceProps[prop]) {
        sourceProps[prop] = ''
      }
    })

    return [
      sourceProps.middlewareName,
      sourceProps.middlewareAction,
      sourceProps.controllerName,
      sourceProps.controllerAction
    ].join('')

    // console.log('Prefix Match - ' + prefix + ' (' + prefix.match(re).length + ') => ', prefix.match(re))
    // console.log('Source Match - ' + source + ' (' + source.match(re).length + ') => ', source.match(re))

    // return [prefix, source].join('')
  }
}
