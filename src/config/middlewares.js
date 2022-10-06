import cors from 'cors'
import { json } from 'express'

import { Helper } from '../utils/Helper'

export default [
  json (),
  cors (Helper.corsOptions ({ 
    origin: ['localhost'] 
  }))
]
