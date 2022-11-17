const express = require('express')
// const { addFile } = require('../controllers/file')
const accountTypeCheck = require('../middleware/roles')
const protect = require('../middleware/authMiddleware')
const router = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { File } = require('../models/file')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

let upload = multer({ storage, fileFilter })

router
  .route('/', protect, accountTypeCheck('manager'))
  .post(upload.single('file'), (req, res) => {
    const file = req.file.filename
    const message = req.body.message
    const userId = req.body.userid

    const newFileData = {
      message,
      file,
      userId
    }

    const newFile = new File(newFileData)

    newFile
      .save()
      .then(() =>
        res.status(200).json({ newFile, message: 'File Uploaded Successfully' })
      )
      .catch(err => res.status(400).json('Error: ' + err))
  })

module.exports = router
