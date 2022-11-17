const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  file: { type: String, required: true }
})

const File = mongoose.model('files', fileSchema)

module.exports = { File }
