import cors from 'cors'
import bodyParser from 'body-parser'
import { json } from 'express'

import corsOptions from './cors'

export default [
  json(),
  bodyParser.urlencoded({ extended: false }),
  cors(corsOptions)
]
