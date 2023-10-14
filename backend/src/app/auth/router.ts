import express from "express";
import handler from "./handler";

const router = express.Router();

router.post("/login", handler.login);

export default router;
