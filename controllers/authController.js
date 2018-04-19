const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models").User;

let authController = {};

// Restrict access to root page
authController.home = (req, res) => {
    console.log(req.user)
    res.json(req.user)
};

// Go to registration page

// authController.register = (req, res) => {
//     res.render("register");
// };

// Post registeration 

authController.doRegister = (req, res, next) => {
    User.register(new User(req.body), req.body.password, (err, user)=>{
        console.log(req.body)
        console.log("-----------" +user)
        console.log(User.register)
        if(err){
            // return res.render("register", {user: user})
            return next(err)
        }
        res.json(user)
        // passport.authenticate("local")(req, res, ()=>{
        //     res.redirect("/");
        // })
    })
};

//Go to login page
// authController.login = (req, res) => {
//     res.render("login");
// };

//post login
authController.doLogin = (req, res) => {
    passport.authenticate("local")(req, res, () => {
        // res.redirect("/")
        res.json(req.user)
    })
};

// logout
authController.logout = (req, res) => {
    req.logout();
    req.redirect("/");
};

module.exports = authController;