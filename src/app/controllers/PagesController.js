import { AppController } from './AppController'

import { Auth } from '@utils/Auth'

export class PagesController extends AppController {
  index (req, res) {
    res.end('Hey')
  }

  about (req, res) {
    res.end('<h1>About Page</h1>')
  }

  async login (req, res) {
    const { username, password } = req.body.user

    const { user, token } = await Auth.attempt({ username, password })

    res.json({ hey: 'Man', token, user })
  }

  async home (req, res) {
    res.json({ authenticated: 'YAs', user: req.user })
  }
}
