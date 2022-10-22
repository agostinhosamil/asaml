import mongoose from '@config/database'

afterAll(async () => {
  await mongoose.disconnect()
})
