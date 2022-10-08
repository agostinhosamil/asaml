import mongoose from 'mongoose'

mongoose.connect(process.env.ATLAS_URI)

mongoose.promise = global.Promise

// mongoose.disconnect()

export default mongoose
