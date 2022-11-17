const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String, required: false }
})

const File = mongoose.model('filess', fileSchema)

module.exports = { File }
