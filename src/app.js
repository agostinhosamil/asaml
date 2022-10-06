import express from "express"
import { Router } from "./utils/Router"

import middlewares from "./config/middlewares"

const app = express()

middlewares.map(middleware => app.use (middleware))

Router.draw(app)

export default app
