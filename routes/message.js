const express = require('express')
const { addMessage } = require('../controllers/message')
const accountTypeCheck = require('../middleware/roles')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/', protect, accountTypeCheck('worker'), addMessage)

module.exports = router
