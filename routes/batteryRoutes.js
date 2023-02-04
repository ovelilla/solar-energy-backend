import express from "express";
import {
    readBatteries,
    createBattery,
    updateBattery,
    deleteBattery,
    deleteBatteries,
} from "../controllers/batteryController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, readBatteries);
router.post("/", checkAuth, createBattery);
router.put("/:id", checkAuth, updateBattery);
router.delete("/:id", checkAuth, deleteBattery);
router.delete("/", checkAuth, deleteBatteries);

export default router;
