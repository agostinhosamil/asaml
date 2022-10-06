import { AppController } from './AppController'

export class PagesController extends AppController {
  index (req, res) {
    res.end ('HEYEYE')
  }

  about (req, res) {
    res.end ('<h1>About Page</h1>')
  }
}
