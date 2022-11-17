const { Message } = require('../models/message')

const addMessage = async (req, res) => {
  try {
    if (!req.body.message)
      return res.status(400).json({ message: 'Please fill all the fields' })

    const SendMessage = await Message.create({
      ...req.body,
      userId: req.user.id
    })

    res
      .status(200)
      .json({ SendMessage, message: 'Message Inserted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!' })
  }
}

module.exports = {
  addMessage
}
