import cors from 'cors'
import morgan from 'morgan'

import { urlencoded } from 'body-parser'
import { json } from 'express'

import corsOptions from './cors'
import { globalErrorHandler } from '@utils/errorHandlers'

export const middlewares = [
  json(),
  urlencoded({ extended: false }),
  cors(corsOptions),
  morgan('combined')
]

export default [
  globalErrorHandler
]
