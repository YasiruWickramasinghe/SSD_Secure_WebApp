const { Message } = require("../models/message");
const Cryptr = require("cryptr");

const addMessage = async (req, res) => {
  try {
    if (!req.body.message)
      return res.status(400).json({ message: "Please fill all the fields" });

    let cryptr = new Cryptr(req.body.message);

    let encrptMsg = cryptr.encrypt(req.body.message);
    let decrptMsg = cryptr.decrypt(encrptMsg);
    console.log(" encrypt: " + encrptMsg);
    console.log(" decrypt" + decrptMsg);

    const SendMessage = await Message.create({
      message: encrptMsg,
      userId: req.user.id,
    });

    res
      .status(200)
      .json({ SendMessage, message: "Message Inserted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  addMessage,
};
