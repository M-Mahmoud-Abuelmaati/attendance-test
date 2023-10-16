import express from "express";

import authRoute from "./auth/router";
import userRoute from "./user/router";
import attendanceRoute from "./attendance/router";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", authMiddleware, userRoute);
router.use("/attendants", authMiddleware, attendanceRoute);

export default router;
