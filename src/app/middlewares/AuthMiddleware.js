import { Auth } from '@utils/Auth'
import { User } from '../models/User'
import { AppMiddleware } from './AppMiddleware'

export class AuthMiddleware extends AppMiddleware {
  root () {
    console.log('Hi, I am a middleware')
  }

  async jwt (req, res) {
    // some jwt implementation
    const auth = await Auth.authenticate(req)

    if (auth) {
      const user = await User.find(auth.user)

      req.user = user
    } else {
      res
        .status(401)
        .json({
          error: 'Unauthenticated',
          message: 'Firstly login'
        })
        .end()
    }
  }
}
