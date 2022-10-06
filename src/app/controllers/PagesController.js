import { AppController } from './AppController'

import { User } from '../models/User'
export class PagesController extends AppController {
  index (req, res) {
    res.end ('HEYEYE')
  }

  about (req, res) {
    res.end ('<h1>About Page</h1>')
  }

  users (req, res) {

    const users = User.getAll ()

    res.end ('Users')
  }
}
