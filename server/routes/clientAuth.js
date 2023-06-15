const router = require("express").Router();
const bcrypt = require("bcrypt");
const { validate, Client } = require("../models/client");
const sendEmail =require("../utils/sendEmail")

router.post("/", async (req, res) => {
  try {
    const client = await Client.findOne({ emailId: req.body.emailId });
    if (!client) {
      return res.status(403).send({ message: "Client does not exist" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      client.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid credentials");
    }
     
    const token = client.generateAuthToken();
    // await sendEmail("singapakulasridhar@gmail.com", "Verify Email", "Hello Namaskaram");

    res.status(200).send({ data: token, message: "Successful login" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
