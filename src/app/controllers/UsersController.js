import { User } from '../models/User'

export class UsersController {
  async index (req, res) {
    const users = await User.all()

    console.log(await User.count())

    res.json(users)
  }

  async store (req, res) {
    const { user: userData } = req.body

    const user = await User.create(userData)

    return res.json(user)
  }

  async show (req, res) {
    const { id } = req.params

    const user = await User.find(id)

    res.json(user)
  }
}
