import '@config/routes'

import app from './app'

import { log } from '@config/log'
import setup from '@config/setup'

const PORT = process.env.PORT || 3000

const main = async () => {
  if (setup instanceof Array) {
    await Promise.all(setup)
  }

  app.listen(PORT, () => log('Server running'))
}

main()
