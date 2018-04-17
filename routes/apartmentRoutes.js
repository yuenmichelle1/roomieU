const axios = require("axios");
const router = require("express").Router();
const apartmentController = require("../controllers/apartmentController");

// localhost/users/
router.get("/:id", userController.find);
router.post("/new", userController.create);
router.get("/", userController.findAll);
router.delete("/:id", userController.delete);



module.exports = router;