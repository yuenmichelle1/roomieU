const axios = require("axios");
const router = require("express").Router();

// Twilio Credentials
const accountSid = "AC4a6009c537be94ef37e1838f246773d6";
const authToken = "a71deb4562d1bda19eab4e3d1493f1a7";

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

router.post("/sendText", (req, res) => {
  console.log(req.body, + "is this A PHONE NUMBER");
  console.log(`BUNNYYYY  ${Object.keys(req.body)[0]}`);
  client.messages
    .create({
      to: Object.keys(req.body)[0],
      from: "+14808008911",
      body:
        "You have a new Roomie Match! Log back in to roomieU to check him/her out!"
    })
    .then(message => console.log(`THIS IS MESSAGE SIDb ${message.sid}`));
});

module.exports =router;
