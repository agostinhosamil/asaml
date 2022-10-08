import { hash } from 'bcryptjs'

import { AppModel } from './AppModel'

export class User extends AppModel {
  static async preSave () {
    if (this.password) {
      this.password = await hash(this.password, 8)
    }
  }
}
