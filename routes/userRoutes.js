const axios = require("axios");
const router = require("express").Router();
const userController = require("../controllers/userController");

// localhost/user/
router.get("/:id", userController.find);
router.post("/new", userController.create);
router.get("/", userController.findAll);
router.delete("/:id", userController.delete);



module.exports = router;

