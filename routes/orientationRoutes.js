import express from "express";
import {
    readOrientations,
    createOrientation,
    updateOrientation,
    deleteOrientation,
    deleteOrientations,
} from "../controllers/orientationController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readOrientations);
router.post("/", checkAuth, createOrientation);
router.put("/:id", checkAuth, updateOrientation);
router.delete("/:id", checkAuth, deleteOrientation);
router.delete("/", checkAuth, deleteOrientations);

export default router;
