import { compare } from 'bcryptjs'

import { log } from '~/config/log'
import { Helper } from './Helper'

import { User } from '@models/User'
// import { Token } from '@models/Token'
import { sign, verify } from 'jsonwebtoken'

export class Auth {
  static async attempt ({ username, password }) {
    const authField = Helper.isEmail(username) ? 'email' : 'username'

    const userData = {}

    userData[authField] = username

    try {
      const queryResult = await User.where(userData)

      if (queryResult.length >= 1) {
        const user = queryResult instanceof Array ? queryResult[0] : queryResult

        const passwordMatches = await compare(password, user.password)

        if (passwordMatches) {
          const token = sign({ user: user._id }, process.env.APP_JWT_SECRET)

          return { user, token }
        } else {
          return Auth._error({
            status: 401,
            message: 'Incorrect user password'
          })
        }
      } else {
        return Auth._error({
          status: 404,
          message: 'Unknown user'
        })
      }
    } catch (err) {
      log(err)

      return Auth._error(err)
    }
  }

  static async authenticate (req) {
    const authorization = {}

    Object.keys(req.headers).forEach(header => {
      if (/^(authorization)$/i.test(header)) {
        const re = /^(Bearer\s+)/i
        authorization.token = (
          req.headers[header]
            .replace(re, '')
            .trim()
        )
      }
    })

    if (authorization.token) {
      try {
        const authData = verify(authorization.token, process.env.APP_JWT_SECRET)

        if (authData) {
          return authData
        }
      } catch (err) {
      }

      return false
    }
  }

  static _error (error) {
    return (
      {
        user: {},
        token: '',
        error
      }
    )
  }
}
