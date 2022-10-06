import { Router } from "../utils/Router"

Router.get ('/', "auth:root@pages/index")

Router.get ('/about', "@pages/about")

Router.get ('/users', '@pages/users')
