const axios = require("axios");
const router = require("express").Router();
const authController = require("../controllers/authController");

// restrict index for logged in user only
router.get('/', authController.home);

router.post('/register', authController.doRegister);

router.post('/login', authController.doLogin);

router.get('/logout', authController.logout);

module.exports = router;