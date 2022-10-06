import { AppMiddleware } from "./AppMiddleware"

export class AuthMiddleware extends AppMiddleware {
  root () {
    console.log ('Hi, I am a middleware')
  }

  jwt () {
    // some jwt implementation
  }
}
