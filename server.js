require("dotenv").config();
// you will need to set up your local .env file to access the key since .env file is ignored by gitignore
console.log(process.env.ZillowApiKey)


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

mongoose.connect(MONGODB_URI)
    .then(() => console.log("connection to mongodb succesful"))
    .catch(err => console.log(err));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(session({secret: "keyboard cat", resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models").User;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


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
