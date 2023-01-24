import { Auth } from '@utils/Auth'
import { User } from '@models/User'

import { AppMiddleware } from './AppMiddleware'

export class AuthMiddleware extends AppMiddleware {
  root () {
    console.log('Hi, I am a middleware')
  }

  base () {}

  async jwt (request, response) {
    // some jwt implementation
    const auth = await Auth.authenticate(request)

    if (auth) {
      const user = await User.find(auth.user)

      request.user = user
    } else {
      response
        .status(401)
        .json({
          error: 'Unauthenticated',
          message: 'Firstly, you have to login'
        })
        .end()
    }
  }
}
