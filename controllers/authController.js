const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models").User;

let authController = {};

authController.home = (req, res) => {
    // console.log(req.user)
    res.json(req.user)
};

authController.doRegister = (req, res) => {
    User.register(new User(req.body), req.body.password, (err, user)=>{
        if(err){
            console.log("err " + err)
            res.json(err);
        }
        passport.authenticate("local")(req, res, ()=>{
            res.json(user);
        })
    })
};

authController.doLogin = (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.json(req.user)
    })
};


authController.logout = (req, res) => {
    req.logout();
    res.json(req.user)
};

module.exports = authController;