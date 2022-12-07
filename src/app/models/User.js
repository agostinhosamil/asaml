import { hash } from 'bcryptjs'

import { AppModel } from './AppModel'

export class User extends AppModel {
  static adapter = 'mysql'

  static async beforeCreate () {
    if (this.password) {
      this.password = await hash(this.password, 8)
    }
  }
}
