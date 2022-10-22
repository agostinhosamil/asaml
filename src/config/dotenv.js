import 'dotenv/config'

import { join } from 'path'
import { config } from 'dotenv'

config({ path: join(__dirname, '..', '..', '.env.' + (process.env.NODE_ENV || 'development')) })
