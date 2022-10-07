export class Route {
  constructor (httpVerb, path, source) {
    Object.assign(this, { verb: httpVerb.toLowerCase(), path, source })
  }
}
