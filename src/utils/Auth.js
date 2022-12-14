import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

import { log } from '~/config/log'
import { Helper } from './Helper'

import { User } from '@models/User'
// import { Token } from '@models/Token'

export class Auth {
  static async attempt ({ username, password }) {
    const authFieldKeyName = Helper.isEmail(username) ? 'email' : 'username'

    const userData = {}

    userData[authFieldKeyName] = username

    try {
      const queryResult = await User.where(userData)

      if (queryResult.length >= 1) {
        const user = queryResult instanceof Array ? queryResult[0] : queryResult

        const passwordMatches = await compare(password, user.password)

        if (passwordMatches) {
          const token = sign({ user: user.id }, process.env.APP_JWT_SECRET)

          return { user, token }
        } else {
          return Auth._error({
            status: 401,
            error_code: 1,
            message: 'Incorrect user password'
          })
        }
      } else {
        return Auth._error({
          status: 404,
          error_code: 0,
          message: 'Unknown user'
        })
      }
    } catch (err) {
      log(err)

      return Auth._error(err)
    }
  }

  static async authenticate (request) {
    const authorization = {}

    Object.keys(request.headers).forEach(header => {
      if (/^(authorization)$/i.test(header)) {
        const re = /^(Bearer\s+)/i
        authorization.token = String(
          request.headers[header]
            .replace(re, '')
            .trim()
        )
      }
    })

    if (authorization.token) {
      try {
        const authData = verify(authorization.token, process.env.APP_JWT_SECRET)
        const validAuthData = Auth.validateAuthData(authData)

        if (validAuthData) {
          return authData
        }
      } catch (err) {
      }
    }

    return false
  }

  static async validateAuthData (authData) {
    if (!authData.id) {
      return false
    }

    const user = await User.findById(authData.id)

    return Boolean(user)
  }

  static _error (error) {
    return (
      {
        user: null,
        token: '',
        error
      }
    )
  }
}
