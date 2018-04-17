require("dotenv").config();
// you will need to set up your local .env file to access the key since .env file is ignored by gitignore
console.log(process.env.ZillowApiKey)


const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require("./routes/apiRoutes");
const routes = require("./routes");

const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/roomies_db";

mongoose.connect(MONGODB_URI);

// Serve up static assets
app.use(express.static("client/build"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Use apiRoutes
app.use(routes); //localhost:3000/api/...

// // Send every request to the React app
// // Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
