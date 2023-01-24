import { Route } from './Route'
import { RouteSource } from './RouteSource'

const store = Symbol('store')

function usePathPrefix (joined) {
  return joined.join('/').split(/\/+/).join('/')
}

function mergeRouteSource (prefix, source) {
  return RouteSource.merge(prefix, source)
}

export class RouterContext {
  [store] = []

  constructor (props) {
    Object.assign(this, props)

    const methods = 'get post group put delete patch'.split(/\s+/)

    methods
      .filter(method => typeof this[method] === 'function')
      .forEach(method => {
        this[method] = this[method].bind(this)
      })
  }

  get () {
    this.factory('get', arguments)
  }

  post () {
    this.factory('post', arguments)
  }

  put () {
    this.factory('put', arguments)
  }

  delete () {
    this.factory('delete', arguments)
  }

  patch () {
    this.factory('patch', arguments)
  }

  factory (httpVerb, args) {
    let [routePath, routeSourceStr] = args

    if (typeof this.pathPrefix === typeof 'str') {
      routePath = usePathPrefix([this.pathPrefix, routePath])
    }

    if (typeof this.sourcePrefix === typeof 'str') {
      routeSourceStr = mergeRouteSource(this.sourcePrefix, routeSourceStr)
    }

    const routeSource = new RouteSource(routeSourceStr)

    const route = new Route(httpVerb, routePath, routeSource)

    this[store].push(route)
  }

  group (pathPrefix, ...args) {
    const groupBody = args.length >= 1 ? args[-1 + args.length] : null

    if (typeof groupBody === 'function') {
      let sourcePrefix

      if (typeof 'str' === typeof args[0]) {
        sourcePrefix = args[0]
      }

      const routerContext = new RouterContext({
        pathPrefix: usePathPrefix([this.pathPrefix || '', pathPrefix]),
        sourcePrefix: mergeRouteSource(this.sourcePrefix, sourcePrefix)
      })

      groupBody(routerContext)

      if (routerContext.store instanceof Array) {
        routerContext.store.forEach(route => this[store].push(route))
      }
    }
  }

  get store () {
    return Array.from(this[store])
  }
}
