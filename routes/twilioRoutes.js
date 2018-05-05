const axios = require("axios");
const router = require("express").Router();

// Twilio Credentials
const accountSid = process.env.TwilioAccountSid;
const authToken = process.env.TwilioAuthToken;

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
