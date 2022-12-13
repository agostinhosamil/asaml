import { Helper } from '@utils/Helper'

export const setup = [
  Helper.setupModels(),

  async () => {
    'use strict'
  }
]

export default setup.map(callback => callback instanceof Promise ? callback : callback())
