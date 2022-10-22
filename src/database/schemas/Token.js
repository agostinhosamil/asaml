import mongoose from '~/config/database'

export default {
  body: {
    type: String,
    required: true
  },

  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
