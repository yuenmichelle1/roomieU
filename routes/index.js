const router = require("express").Router();
const userRouter = require("./userRoutes");
const apartmentRouter = require("./apartmentRoutes");
const authRouter = require("./authRoutes");
const twilioRouter= require("./twilioRoutes");


router.use("/api/user", userRouter);
router.use("/api/apartment", apartmentRouter);
router.use("/auth", authRouter);
router.use("/api/text", twilioRouter);



module.exports = router;
