import { Route } from './Route'
import { RouteSource } from './RouteSource'

import { log } from '@config/log'

const store = []

export class Router {
  static get () {
    return Router.factory('get', arguments)
  }

  static post () {
    return Router.factory('post', arguments)
  }

  static patch () {
    return Router.factory('patch', arguments)
  }

  static delete () {
    return Router.factory('delete', arguments)
  }

  static put () {
    return Router.factory('put', arguments)
  }

  static factory (httpVerb, args) {
    const [routePath, routeSourceStr] = args

    const routeSource = new RouteSource(routeSourceStr)

    const route = new Route(httpVerb, routePath, routeSource)

    store.push(route)

    return route
  }

  static draw (app) {
    store.forEach(route => {
      const routeArgs = [route.path]
      const action = route.source.controller[route.source.action]

      const internalServerErrorHandler = (res, error) => {
        log(error)

        res
          .status(500)
          .json({
            error: 'Internal server error',
            message: 'Sorry! Some thing went wrong'
          })
          .end()
      }

      if (typeof route.source.middleware === 'function') {
        routeArgs.push([function (req, res, next) {
          try {
            const middlewareData = route.source.middleware.apply(this, arguments)

            if (middlewareData instanceof Promise) {
              middlewareData
                .then(() => {
                  if (!res.finished) {
                    next()
                  }
                })
                .catch(error => {
                  internalServerErrorHandler(res, error)
                })
            } else {
              next()
            }
          } catch (error) {
            internalServerErrorHandler(res, error)
          }
        }])
      }

      if (!(typeof action === 'function')) {
        throw new Error('App:Router Error - Unresolved action for controller')
      }

      routeArgs.push(action)

      app[route.verb].apply(app, routeArgs)
    })
  }
}
