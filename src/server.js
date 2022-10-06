import './config/routes'

import { log } from './config/log'
import app from "./app"

const PORT = process.env.PORT || 3000

app.listen (PORT, () => log ('Server running'))
