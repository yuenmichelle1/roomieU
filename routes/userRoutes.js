const axios = require("axios");
const router = require("express").Router();
const userController = require("../controllers/userController");

// localhost/users/
router.get("/:id", userController.find);
router.post("/new", userController.create);
router.get("/", userController.findAll);
router.delete("/:id", userController.delete);

router.put("/:id", userController.update);
router.get("/:id/savedApartments", userController.findSavedApartment)


module.exports = router;

