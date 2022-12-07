import mongoose from 'mongoose'

import { mongo } from './database'

mongoose.connect(mongo.url)

mongoose.promise = global.Promise

// mongoose.disconnect()

export default mongoose
