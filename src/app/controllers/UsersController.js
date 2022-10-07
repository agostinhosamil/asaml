import { User } from '../models/User'

export class UsersController {
  async index (req, res) {
    const users = await User.getAll()

    console.log(users)

    res.json(users)
  }

  async store (req, res) {
    const { user: userData } = req.body

    const user = await User.create(userData)

    return res.json(user)
  }
}
