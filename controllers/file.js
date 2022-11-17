const { File } = require('../models/file')

const addFile = async (req, res) => {
  try {
    if (!req.body.message)
      return res.status(400).json({ message: 'Please fill all the fields' })

    const SendFile = await File.create({
      ...req.body,
      userId: req.user.id
    })

    res.status(200).json({ SendFile, message: 'File Uploaded Successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!' })
  }
}

module.exports = {
  addFile
}
