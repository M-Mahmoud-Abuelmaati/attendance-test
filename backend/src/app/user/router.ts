import express from "express";
import handler from "./handler";

const router = express.Router();

router.post("/", handler.create);
router.patch("/:id", handler.update);
router.get("/:id", handler.get);
router.delete("/:id", handler.delete);

export default router;
