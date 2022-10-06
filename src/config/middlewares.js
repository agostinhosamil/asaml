import cors from 'cors'
import bodyParser from 'body-parser'
import { json } from 'express'

import { Helper } from '../utils/Helper'

export default [
  json (),
  bodyParser.urlencoded ({ extended: false }),
  cors (Helper.corsOptions ({ 
    origin: ['localhost'] 
  }))
]
