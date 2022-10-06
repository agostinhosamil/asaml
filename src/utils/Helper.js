export class Helper {
  static corsOptions (corsOptions) {
    Object.keys(corsOptions).map (key => {
      const keyReader = `_read${Helper.title(key)}`

      if (typeof Helper[keyReader] === 'function') {
        corsOptions [key] = Helper[keyReader].apply (Helper, [corsOptions [key]])
      }
    })
    
    return corsOptions
  }

  static _readOrigin (origin) {
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
}
