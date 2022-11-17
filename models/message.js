const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true }
})

const Message = mongoose.model('messages', messageSchema)

module.exports = { Message }
