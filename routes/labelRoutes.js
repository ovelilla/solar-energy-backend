import express from "express";
import {
    readLabels,
    createLabel,
    updateLabel,
    updateLabelEnabled,
    updateLabelColor,
    deleteLabel,
} from "../controllers/labelController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readLabels);
router.post("/", checkAuth, createLabel);
router.put("/:id", checkAuth, updateLabel);
router.patch("/:id/enabled", checkAuth, updateLabelEnabled);
router.patch("/:id/color", checkAuth, updateLabelColor);
router.delete("/:id", checkAuth, deleteLabel);

export default router;
