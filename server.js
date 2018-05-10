require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

//auth
mongoose.Promise = global.Promise;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/roomies_db";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connection to mongodb succesful"))
  .catch(err => console.log(err));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models").User;
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serve up static assets
app.use(express.static(path.join(__dirname,"client", "build")));
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// } else {
//   // Use express.static to serve the public folder as a static directory
//   app.use(express.static("public"));
// }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(routes); 

// // Send every request to the React app
// // Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
  });
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
