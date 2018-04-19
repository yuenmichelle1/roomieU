const router = require("express").Router();
const userRouter = require("./userRoutes");
const apartmentRouter = require("./apartmentRoutes");

router.use("/api/user", userRouter);
router.use("/api/apartment", apartmentRouter);

module.exports = router;