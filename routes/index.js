const router = require("express").Router();
const userRouter = require("./userRoutes");
const apartmentRouter = require("./apartmentRoutes");
const authRouter = require("./authRoutes")

router.use("/api/user", userRouter);
router.use("/api/apartment", apartmentRouter);
router.use("/auth", authRouter);

module.exports = router;