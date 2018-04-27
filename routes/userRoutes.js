const axios = require("axios");
const router = require("express").Router();
const userController = require("../controllers/userController");

// localhost/api/user/
router.get("/:id", userController.find);
router.post("/new", userController.create);
router.get("/", userController.findAll);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);
router.post("/", userController.filter);
router.post(`/requested`, userController.getLikes);




module.exports = router;

