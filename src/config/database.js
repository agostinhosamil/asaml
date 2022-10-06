import mongoose from 'mongoose'

mongoose.connect (process.env.ATLAS_URI)

mongoose.promise =  global.Promise

export default mongoose
