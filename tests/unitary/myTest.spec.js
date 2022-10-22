import factory from '@database/factory'

describe('App Test', () => {
  it('should do it well', async () => {
    const val = 1 + 3

    const user = await factory.create('User', { name: 'John Doe' })

    expect(user.name).toBe('John Doe')

    expect(val).toBe(4)
  })
})
