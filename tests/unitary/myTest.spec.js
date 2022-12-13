import factory from '@database/factory'

describe('App Test', () => {
  it('should create a user', async () => {
    // const val = 1 + 3

    const user = await factory.create('User')

    // expect(user.name).toBe('John Doe')

    expect(user).toBe(user)
  })
})
