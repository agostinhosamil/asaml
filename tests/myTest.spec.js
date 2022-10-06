import { User } from '../src/app/models/User'

describe ('APp Test', () => {
  it ('should do it well', () => {
    const val = 1+3

    expect (User.name).toBe('User')

    expect (val).toBe(4)
  })
})
