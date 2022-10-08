import { User } from '@models/User'

import mongoose from '@config/database'

describe('App Test', () => {
  afterAll(async () => {
    await mongoose.disconnect()
  })

  it('should do it well', async () => {
    const val = 1 + 3

    const user = await User.create({
      name: 'John Doe',
      email: 'john.doe.' + Math.random() + 'ysy@gmail.com',
      password: 'Mandatory'
    })

    expect(user.name).toBe('John Doe')

    expect(val).toBe(4)
  })
})
