const axios = require("axios");
const router = require("express").Router();
const apartmentController = require("../controllers/apartmentController");

// localhost/users/
router.get("/:id", apartmentController.find);
router.post("/new", apartmentController.create);
router.get("/", apartmentController.findAll);
router.delete("/:id", apartmentController.delete);



module.exports = router;