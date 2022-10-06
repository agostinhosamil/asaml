import 'dotenv/config'
import './config/routes'

import app from "./app"

import { log } from './config/log'
import { Helper } from './utils/Helper'

const PORT = process.env.PORT || 3000

const main = (async () => {

  await Helper.setupModels ()

  app.listen (PORT, () => log ('Server running'))
})

main ()
