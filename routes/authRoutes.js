const axios = require("axios");
const router = require("express").Router();
const authController = require("../controllers/authController");

// restrict index for logged in user only
router.get('/', authController.home);

// route to register page
router.get('/register', authController.register);

// route for register action
router.post('/register', authController.doRegister);

// route to login page
router.get('/login', authController.login);

// route for login action
router.post('/login', authController.doLogin);

// route for logout action
router.get('/logout', authController.logout);

module.exports = router;