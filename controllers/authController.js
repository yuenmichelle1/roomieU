const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models").User;

let authController = {};

// Restrict access to root page
authController.home = (req, res) => {
    res.render("index", {user: req.user})
};

// Go to registration page
authController.register = (req, res) => {
    res.render("register");
};

// Post registeration 

authController.doRegister = (req, res) => {
    User.register(new User({ username: req.body.username, name: req.body.name
    }), req.body.password, (err, user)=>{
        if(err){
            return res.render("register", {user: user})
        }

        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/");
        })
    })
};

//Go to login page
authController.login = (req, res) => {
    res.render("login");
};

//post login
authController.doLogin = (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.redirect("/")
    })
};

// logout
authController.logout = (req, res) => {
    req.logout();
    req.redirect("/");
};

module.exports = authController;