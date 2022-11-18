require('dotenv').config()
const express = require('express')

const https = require('https')
const path = require('path')
const fs = require("fs");

const app = express()
const cors = require('cors')
const connection = require('./config/db')
const PORT = process.env.PORT || 5000
const PASSPHRASE = process.env.PASSPHRASE || '';

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')

// database connection
connection()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/message', messageRoute)


// app.listen(PORT, console.log(`Listening on port ${PORT}`))

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
    certificate: fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
    passphrase: PASSPHRASE
}, app)

sslServer.listen(PORT, () => console.log('secure server on ' + PORT))