import express from "express";
import handler from "./handler";
import validator from "./validator";

const router = express.Router();

router.post("/", validator.create, handler.create);
router.patch("/:id", validator.update, handler.update);
router.get("/", validator.getByCriteria, handler.getByCriteria);
router.get("/:id", validator.paramId, handler.get);
router.delete("/:id", validator.paramId, handler.delete);

export default router;
