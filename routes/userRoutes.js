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

router.get("/:id/populated", userController.getPopulatedUserInfo);

router.put("/:id/cancel", userController.cancelRoomie);
router.put("/:id/decline", userController.declineRoomie)
// router.post(`/requested`, userController.getLikes);
router.put("/:id/request", userController.requestRoomie)


module.exports = router;

