import express from "express";
import {
    readMeters,
    createMeter,
    updateMeter,
    deleteMeter,
    deleteMeters,
} from "../controllers/meterController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", readMeters);
router.post("/", checkAuth, createMeter);
router.put("/:id", checkAuth, updateMeter);
router.delete("/:id", checkAuth, deleteMeter);
router.delete("/", checkAuth, deleteMeters);

export default router;
