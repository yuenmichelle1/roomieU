const axios = require("axios");
const router = require("express").Router();
const apartmentController = require("../controllers/apartmentController");

// localhost/users/
router.get("/:id", apartmentController.find);
router.get("/search", apartmentController.search);

router.post("/:userId/save", apartmentController.save);
router.delete("/:userId/:id/unsave", apartmentController.unsave);

router.get("/:userId/savedApartments", apartmentController.findSavedApartment)


module.exports = router;