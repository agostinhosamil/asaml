import 'express-async-errors'
import express from 'express'

import { Router } from './utils/Router'
import appMiddlewares, { middlewares } from './config/middlewares'

const app = express()

middlewares.forEach(middleware => app.use(middleware))

Router.draw(app)

appMiddlewares.forEach(middleware => app.use(middleware))

export default app
