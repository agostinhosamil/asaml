import express from "express"
import { Router } from "./utils/Router"

const app = express()

Router.draw(app)

export default app
