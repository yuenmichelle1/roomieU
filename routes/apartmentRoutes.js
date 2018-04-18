const axios = require("axios");
const router = require("express").Router();
const apartmentController = require("../controllers/apartmentController");

// localhost/users/
router.get("/:id", apartmentController.find);
router.post("/:userId/save", apartmentController.save);
router.get("/", apartmentController.findAll);
router.delete("/:userId/:id/unsave", apartmentController.delete);



module.exports = router;