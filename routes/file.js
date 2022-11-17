const express = require('express')
const { addFile } = require('../controllers/file')
const accountTypeCheck = require('../middleware/roles')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', protect, accountTypeCheck('manager'), addFile)

module.exports = router
