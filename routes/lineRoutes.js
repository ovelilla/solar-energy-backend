import express from "express";
import {
    readLines,
    createLine,
    updateLine,
    deleteLine,
    deleteLines,
} from "../controllers/lineController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readLines);
router.post("/", checkAuth, createLine);
router.put("/:id", checkAuth, updateLine);
router.delete("/:id", checkAuth, deleteLine);
router.delete("/", checkAuth, deleteLines);

export default router;
