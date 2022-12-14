import cors from 'cors'
import morgan from 'morgan'

import { urlencoded } from 'body-parser'
import { json } from 'express'

import corsOptions from './cors'

export default [
  json(),
  urlencoded({ extended: false }),
  cors(corsOptions),
  morgan('combined')
]
