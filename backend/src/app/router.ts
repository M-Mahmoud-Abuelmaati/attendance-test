import express from "express";

import authRoute from "./auth/router";
import userRoute from "./user/router";
import attendanceRoute from "./attendance/router";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/attendance", attendanceRoute);

export default router;
